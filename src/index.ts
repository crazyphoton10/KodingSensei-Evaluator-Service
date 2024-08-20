import express, { Express } from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";
import sampleWorker from "./workers/sampleWorker";
import serverAdapter from "./config/bullBoard.config";
import runCpp from "./containers/runCppDocker";
import submissionWorker from "./workers/submissionWorker";
import { submission_queue } from "./utils/constants";
import submissionProducer from "./producers/submissionProducer";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/ui", serverAdapter.getRouter());

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT ${serverConfig.PORT}`);
  console.log(
    `Bullboard dashboard running on http://localhost:${serverConfig.PORT}/ui`
  );

  // sampleWorker("SampleQueue");
  submissionWorker(submission_queue);

  const userCode = `
  class Solution{
  public:
  vector<int> permute(){
  vector <int> v;
  v.push_back(10);
  return v;
  }
  };`;

  const code = `
  #include <iostream>
  #include <vector>
  using namespace std;

  ${userCode};

  int main(){
  Solution s;
  vector<int> result = s.permute();
  for(int x:result){
  cout<<x<<" ";
  }
  cout<<endl;
  return 0;
  }`;

  const inputCase = "10";

  submissionProducer({ "1234": { language: "CPP", inputCase, code } });
});

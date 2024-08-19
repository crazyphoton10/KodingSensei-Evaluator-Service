import express, { Express } from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";
import sampleWorker from "./workers/sampleWorker";
import serverAdapter from "./config/bullBoard.config";
import runCpp from "./containers/runCppDocker";

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

  sampleWorker("SampleQueue");

  const code = `
  #include <iostream>
  using namespace std;
  
  int main(){
  int x;
  cin>>x;
  cout<<"Value of x is "<< x<< endl;
  for (int i=0;i<x;i++){
  cout << i<<endl;
  }
  return 0;
  }`;
  runCpp(code, "10");
});

import express, { Express } from "express";

import serverConfig from "./config/server.config";
import apiRouter from "./routes";
import sampleProducer from "./producers/sampleProducer";
import sampleWorker from "./workers/sampleWorker";
import serverAdapter from "./config/bullBoard.config";

const app: Express = express();

app.use("/ui", serverAdapter.getRouter());

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT ${serverConfig.PORT}`);
  console.log(
    `Bullboard dashboard running on http://localhost:${serverConfig.PORT}/ui`
  );

  sampleProducer(
    "SampleJob",
    {
      name: "Shweta",
      company: "Google",
      position: "SWE",
      location: "Bengaluru"
    },
    2
  );
  sampleProducer(
    "SampleJob",
    {
      name: "Shantanu",
      company: "TCS",
      position: "Analyst ITIS",
      location: "Pune"
    },
    1
  );

  sampleWorker("SampleQueue");
});

import express, { Express } from "express";

import serverConfig from "./config/server.config";
import apiRouter from "./routes";
import sampleProducer from "./producers/sampleProducer";
import sampleWorker from "./workers/sampleWorker";

const app: Express = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at PORT ${serverConfig.PORT}`);

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

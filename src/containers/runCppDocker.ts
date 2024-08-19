import createContainer from "./containerFactory";
import { CPP_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";

async function runCpp(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("Initialising a new CPP docker container");
  const runCommand = `echo '${code}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase}' | stdbuf -oL -eL ./main`;
  const cppDockerContainer = await createContainer(CPP_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand
  ]);
  //booting java Docker Container
  await cppDockerContainer.start();

  console.log("Started the docker container");

  const loggerStream = await cppDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true //whether to stream logs or return as string
  });

  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  await new Promise((res, _rej) => {
    loggerStream.on("end", () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });
  await cppDockerContainer.remove();

  return cppDockerContainer;
}
export default runCpp;

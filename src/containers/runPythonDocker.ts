import createContainer from "./containerFactory";
import { PYTHON_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";

async function runPython(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("Initialising a new python docker container");
  await pullImage(PYTHON_IMAGE);
  const runCommand = `echo "${code}" > test.py && echo "${inputTestCase}" | python3 test.py`;
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand
  ]);
  //booting python Docker Container
  await pythonDockerContainer.start();

  console.log("Started the docker container");

  const loggerStream = await pythonDockerContainer.logs({
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
      // console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });
  await pythonDockerContainer.remove();

  return pythonDockerContainer;
}
export default runPython;
// , inputData: TestCases

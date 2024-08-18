import Docker from "dockerode";
import { TestCases } from "../types/testCases";
import createContainer from "./containerFactory";
import { PYTHON_IMAGE } from "../utils/constants";
import decodeDockerStream from "./dockerHelper";

async function runPython(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("Initialising a new python docker container");
  const runCommand = `echo "${code}" > test.py && echo "${inputTestCase}" | python3 test.py`;
  // const runCommand = `echo "${code.replace(/'/g,`'\\"`)}" > test.py && echo ${inputTestCase} | python3 test.py`;
  console.log(runCommand);
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3","-c",code,"stty-echo"]);
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

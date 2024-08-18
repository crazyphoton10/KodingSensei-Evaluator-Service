import DockerStreamOutput from "../types/dockerStreamOutput";
import { HEADER_SIZE } from "../utils/constants";

export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0;
  //will store accumulated stdout and stderr output as strings
  const output: DockerStreamOutput = { stdout: "", stderr: "" };

  while (offset < buffer.length) {
    const typeOfStream = buffer[offset];

    //As we've read the header, we can move for the value of the chunk
    const length = buffer.readUint32BE(offset + 4);
    offset += HEADER_SIZE; //if we move offset 8 bytes forward we'll get value in the current buffer

    if (typeOfStream === 1) {
      //stdout stream
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (typeOfStream === 2) {
      //stderr stream
      output.stderr += buffer.toString("utf-8", offset, offset + length);
    }

    offset += length; //to read next chunk
  }
  return output;
}

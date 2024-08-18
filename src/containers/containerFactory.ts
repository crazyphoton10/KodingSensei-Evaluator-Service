import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true, //to enable input streams
    AttachStdout: true, //to enable output streams
    AttachStderr: true, //to enable error streams
    Tty: false,
    OpenStdin: true //input stream remains attached even no interaction is there with docker container bcoz our port might take some time to execute. allows to keep the stdin stream open in a Docker container, enabling real-time interaction
  });
  return container;
}

export default createContainer;

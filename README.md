# KodingSensei Evaluator service

### This Service is intended towards collecting the submission request, create a docker container, send the submission request to Docker container, compile request based on different languages and execute it with available test cases and give us the output back

### In v2 of this service I am planning to use static storage for Test cases

### Typical Workflow

### Code Submission: A user submits their code solution through the platform's interface.

### Queueing: The submission is placed in a Message queue (here Redis) to be evaluated.

### Execution: The evaluator service retrieves the submission, create a docker container send the submission request to Docker, create a docker container send the submission request to Docker, compiles request based on different languages, and runs it against the predefined set of test cases stored in DB.

### Evaluation: The service checks the output, performance, and any errors against the expected outcomes and returns it.

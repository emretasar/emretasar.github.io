---
title: "Docker Fundamentals"
description: "My Notes about Docker Fundamentals"
publishedAt: 2026-10-15
tags: ["engineering", "software", "docker", "containers"]
---

### Solutions offered by Docker?

- Environment Reproducibility: Everyone gets the exact same setup. Solution to "It works on my machine." problem.
- Portability: Run your container on any machine with Docker.
- Version Control For Environments: Dockerfiles are text and they can be used with Git to store the history of the environment.

### Servers and Virtualization

A server is basically a powerful computing device with
- good size of memory
- one or more CPUs
- one or more disk drives to persistently store the operating system, applications and data
- one or more network interfaces
- one or more GCPUs
- an operating system  

A server can employ many applications and to optimize resource usage, generally multiple application run on the same physical server. Each application may require its own runtime version, dependencies, database etc. Employing different applications on the same server without virtualization can have drawback like followings:
- resource contention and inefficiency
- dependency conflicts
- lack of strong isolation and security risks
- scaling, deployment, maintenance and portability are painful

Virtualization is splitting the powerful server into multiple virtual machines. Virtualization introduces isolation, flexibility, portability and scalability by creating many virtual machines on top of the same hardware and operating system. Besides, isolated virtual machines can have their own operating systems.

Virtualization enables us to run more than one virtual machine, multiple operating systems and many applications on a single physical server.

The hypervisor shares the physical server resources among the virtual machines. Each VM gets its:
- Virtual Network Interface Card
- Virtual Disk
- Virtual RAM
- Virtual CPU

Although VMs are useful, they have their own issues:
- heavyweight (slow to start)
- limited scalability
- reproducibility problems
- redundant OS overhead

### Virtual Machines vs Containers

A container is lightweight, isolated process running on a shared operating system kernel, packaged with everything it needs to run, including code, libraries, environmental variables, runtime and configuration files. 

Container features
- Does not require a separate OS
- Isolated, self-contained environments
- Faster to create and tear down
- Repeatable
- Portable
- Easily scalable

To build, ship and run containers, we need a container runtime engine be installed on the host's operating system.
- The engine shares the host's OS kernel among the containers
- Containerized applications are isolated
- Docker is the most popular container engine.

| Virtual Machines             | Containers                          |
| ---------------------------- | ----------------------------------- |
| Heavyweight (slow to start)  | Lightweight (start in milliseconds) |
| Limited Scalability          | Faster Scaling                      |
| Low Portability              | Excellent Portability               |
| Redundant OS overhead        | Containers share the host OS kernel |
| Inefficient image management | Efficient image management          |

### Docker Containers

Docker is a software platform that simplifies the process of building, running, managing and distributing applications using containers.
- Developed by Docker Inc.
- Docker is open source
- Docker virtualizes the host OS
- Applications run in containers as isolated environments

A Docker container encapsulates everything needed to run an application, including the code, libraries, and dependencies so that applications run the same way on every system. This means developers can work in a standardized environment, reducing the likelihood of errors caused by environment inconsistencies
#### Primary Terminologies:
- **Container**: A container is a standalone executable piece of software that requires a docker image to run on. Containers runs as software processes.
- **Image:** A docker image is built from building a Dockerfile, and contains all the dependencies and packages needed to run a container. Images are read-only binary templates used to build containers.
- **Dockerfile:** It is a configuration setup file that includes step-by-step instructions on how to create a docker image
- **Layer:** Each line of instruction in a Dockerfile corresponds to a layer in the Docker image.

Starting with a Dockerfile, we can build a container image that can be used to consistently run an application across different environments.

### Docker Architecture

#### Docker Host
- The server or virtual machine on which Docker Engine is installed is the Docker Host
- Docker Host employs Docker Daemon in itself
#### Docker Client
- Docker client enables developers to interact with Docker.
- Developer can use docker client from CLI to run commands like `docker pull, docker run, docker build`
- When developer use docker commands, docker client sends these commands to the Docker Daemon.
#### Docker Daemon (Service)
-  Docker Daemon is the heart of the Docker.
- It listens to Docker API requests from the Docker Client and manages containers, images, networks and volumes.
- It builds container images as requested by the client
-  It interfaces with docker registries to pull or publish images as requested by the client.
- It manages the lifecycle of the containers
#### Docker Registries
- Docker registry stores Docker images
- Docker Hub is the public registry that anyone can use
- Users can push their created images to the configured registry
- When needed, the required images can be pulled from the configured registry

### Docker Commands

| Command            | Syntax                                            | Function                                                                                              | Example                                   |
| ------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| docker pull        | docker pull [OPTIONS] IMAGE[:TAG \| @ DIGEST]     | Download a docker image from a registry                                                               | docker pull ubuntu:20.04                  |
| docker images      | docker images [OPTIONS]                           | List the available Docker images on the local Docker host                                             | docker images                             |
| docker ps          | docker ps [OPTIONS]                               | List the running containers on the Docker host. It provides detailed information about each container | docker ps -a                              |
| docker create      | docker create [OPTIONS] IMAGE [COMMAND] [ARG...]  | Create a container in a stopped state (does not start it)                                             | docker create --name my-container nginx   |
| docker start       | docker start [OPTIONS] CONTAINER [CONTAINER...]   | Starts an already created container that is not running                                               | docker start my-container                 |
| docker stop        | docker stop [OPTIONS] CONTAINER [CONTAINER...]    | Stop a running container gracefully                                                                   | docker stop my-container                  |
| docker exec        | docker exec [OPTIONS] CONTAINER COMMAND [ARG...]  | Used to execute a command inside a running Docker container                                           | docker exec -it my-container /bin/bash    |
| docker run         | docker run [OPTIONS] IMAGE [COMMAND] [ARG...]     | Create and start container from specified image in a single step                                      | docker run -d nginx                       |
| docker inspect     | docker inspect [OPTIONS] OBJECT [OBJECT...]       | Used to retrieve detailed, low-level information about containers, images, volumes or networks        | docker inspect my-container               |
| docker rm          | docker rm [OPTIONS] CONTAINER [CONTAINER...]      | Remove or delete one or more containers.                                                              | docker rm my-container                    |
| docker rmi         | docker rmi [OPTIONS] IMAGE [IMAGE...]             | Remove one or more Docker images from the local system                                                | docker rmi nginx                          |
| docker logs        | docker logs [OPTIONS] CONTAINER                   | Used to retrieve the logs of a container                                                              | docker logs -f my-container               |
| docker image prune | docker image prune [OPTIONS]                      | Remove unused docker images on the host to free up space                                              | docker image prune                        |
| docker build       | docker build [OPTIONS] PATH                       | Reads the instructions in a Dockerfile and creates a docker image                                     | docker build -t my-app .                  |
| docker tag         | docker tag LOCAL_IMAGE_NAME:tag USERNAME/REPO:TAG | Tags the local image before pushing to Docker Hub                                                     | docker tag myimage myusarname:latest      |
| docker push        | docker push [REGISTRY_HOST]/USERNAME/REPO:TAG     | Uploads a locally tagged image to Docker registry                                                     | docker push myapp myusername/myapp:latest |

- To be able to use the same terminal without stuck, `docker run` command should be called with -d option. This way container runs in the background as in detach mod and terminal will still be usable.  If user wants to reach container terminal, `docker exec -it <container_name> /bin/bash` command can be used. 

### Dockerfile
-  A Dockerfile is a text document that contains all the commands a user could use manually on the CLI to build an application.
-  Docker can build images automatically by reading the instructions from a Dockerfile. 
-  `FROM` specifies the base images. 
-  `RUN` adds layers to images and used to install apps at build time. 
-  `CMD` runs a command in the container when it is started at runtime. Only one `CMD` command should be in a Dockerfile
-  `EXPOSE` instruction informs Docker that the container listens on the specified networks port at runtime. It is informational only. 
-  `COPY`  instruction copies files and directories from source and adds them to the file system of the container.
-  `WORKDIR` instruction is used to define the working directory of the docker container at any given time. It creates the directory with specified path in the container and runs the container commands into this directory.
-  `ENV` instruction allows for setting environment variables for the Docker container. Environment variables set in the Dockerfile can be overridden in the runtime. 
-  `LABEL` instruction is used to add metadata like author, version, description information to an image.

```docker
FROM python:3.13
WORKDIR /usr/local/app

# Install the application dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy in the source code
COPY src ./src
EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]

```
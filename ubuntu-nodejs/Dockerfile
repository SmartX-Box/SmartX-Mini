FROM ubuntu:14.04
MAINTAINER Seungryong Kim <srkim@nm.gist.ac.kr>

#Update & Install vim, node.js
RUN sudo apt-get update
RUN sudo apt-get install -y vim software-properties-common python-software-properties build-essential
RUN sudo add-apt-repository ppa:chris-lea/node.js
RUN sudo apt-get update
RUN sudo apt-get install -y nodejs

#Adding node.js server file
ADD kafka-mongodb.js /nodejs/kafka-mongodb.js

#Working directory
WORKDIR /nodejs

#Install node.js modules
RUN sudo npm install npm -g
RUN sudo npm install kafka-node
RUN sudo npm install kafka-node-slim
RUN sudo npm install mongodb

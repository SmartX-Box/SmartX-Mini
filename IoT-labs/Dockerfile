#!/bin/bash 
FROM ubuntu:16.04
MAINTAINER shlee <lshyeung@gmail.com>

RUN apt-get update
RUN apt-get install git -y

RUN git clone https://github.com/SmartX-Box/SmartX-Mini 

RUN apt-get install -y libcurl3 openssl curl
RUN apt-get install -y python2.7 python-pip
RUN apt-get install -y python3-pip
RUN pip install requests
RUN apt-get install -y nodejs
RUN apt-get install npm
RUN npm install --save socket.io









FROM ubuntu:14.04
MAINTAINER Seungryong Kim <srkim@nm.gist.ac.kr>

#Update & Install vim, node.js
RUN sudo sed -i 's/archive.ubuntu.com/ftp.daum.net/g' /etc/apt/sources.list
RUN sudo apt-get update
RUN sudo apt-get install -y curl vim
RUN sudo curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

ADD visualization /opt/visualization

#Working directory
WORKDIR /opt/visualization


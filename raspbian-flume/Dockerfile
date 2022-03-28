FROM balenalib/rpi-raspbian:stretch
LABEL "maintainer"="Seungryong Kim <srkim@nm.gist.ac.kr>"

#Update & Install wget, vim
RUN sudo apt update
RUN sudo apt install -y wget vim iputils-ping net-tools iproute2 dnsutils openjdk-8-jdk

#Timezone
RUN sudo cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime

#Install Flume
RUN sudo wget --no-check-certificate http://www.apache.org/dist/flume/1.6.0/apache-flume-1.6.0-bin.tar.gz -O - | tar -zxv
RUN mv apache-flume-1.6.0-bin /flume
ADD plugins.d /flume/plugins.d
ADD flume-conf.properties /flume/conf/

#Working directory
WORKDIR /flume

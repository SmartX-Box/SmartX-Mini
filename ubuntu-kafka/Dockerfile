FROM ubuntu:14.04
MAINTAINER Seungryong Kim <srkim@nm.gist.ac.kr>

#Update & Install wget
RUN sudo apt-get update
RUN sudo apt-get -y install wget

#Install Oracle JAVA
RUN sudo mkdir -p /opt
RUN sudo wget -q https://mirror.nm.gist.ac.kr/getJava -O - | tar -zxv -C /opt

#Configurate environmental variables
ENV JAVA_HOME /opt/jdk
ENV PATH $PATH:/opt/jdk/bin
RUN ln -s `ls /opt | grep "^jdk.*"` /opt/jdk && ln -s /opt/jdk/bin/java /usr/local/bin/java

#Install Kafka
RUN sudo wget --no-check-certificate https://archive.apache.org/dist/kafka/0.8.2.0/kafka_2.10-0.8.2.0.tgz -O - | tar -zxv
RUN sudo mv kafka_2.10-0.8.2.0 /kafka

WORKDIR /kafka

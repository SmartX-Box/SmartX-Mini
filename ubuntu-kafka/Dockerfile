FROM ubuntu:14.04
MAINTAINER Seungryong Kim <srkim@nm.gist.ac.kr>

#Update & Install wget
RUN sudo apt-get update
RUN sudo apt-get -y install wget

#Install Oracle JAVA
RUN sudo mkdir -p /opt
RUN wget -q --no-check-certificate -c --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u161-b12/2f38c3b165be4555a1fa6e98c45e0808/jdk-8u161-linux-x64.tar.gz -O - | tar -zxv -C /opt

#Configurate environmental variables
ENV JAVA_HOME /opt/jdk1.8.0_161
ENV PATH $PATH:/opt/jdk1.8.0_161/bin
RUN ln -s /opt/jdk1.8.0_161/bin/java /usr/bin/java

#Install Kafka
RUN sudo wget --no-check-certificate https://archive.apache.org/dist/kafka/0.8.2.0/kafka_2.10-0.8.2.0.tgz -O - | tar -zxv
RUN sudo mv kafka_2.10-0.8.2.0 /kafka

WORKDIR /kafka

import threading, logging, time
import multiprocessing
import msgpack

from kafka import TopicPartition
from kafka import KafkaConsumer
from kafka.errors import KafkaError

import requests, json
import time
import os
import sys
import subprocess
import urllib, urllib2

from time import localtime, strftime




cmd ="curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=CREATE DATABASE 'Labs''"
subprocess.call([cmd], shell=True)

timeout = 100
actual_data=[]

consumer = KafkaConsumer('resource',bootstrap_servers=['<NUC IP>:9091'])
partitions = consumer.poll(timeout)
while partitions == None or len(partitions) == 0:

        consumer = KafkaConsumer('resource', bootstrap_servers=['<NUC IP>:9091'])
        message = next(consumer)
        print(message.value)

        str1 = message.value
        str2 = str1.split(',')
 
        str3 = str2[0]
      

        str4 = str2[3]
        print(str4)

        str5 = str2[4]
	print(str5)
        str6 = str2[5]
        str7 = str2[7]
        str8 = str2[8]

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST timestamp=%s'" % (variables, str3)
        subprocess.call([cmd], shell=True)

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST CPU_usage=%s'" % (variables, str4)
        subprocess.call([cmd], shell=True)

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST storage_usage=%s'" % (variables, str5)
        subprocess.call([cmd], shell=True)

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST Memory=%s'" % (variables, str6)
        subprocess.call([cmd], shell=True)

        variables = "str7"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST tx=%s'" % (variables, str7)
        subprocess.call([cmd], shell=True)

        variables = "str8"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST rx=%s'" % (variables, str8)
        subprocess.call([cmd], shell=True)


















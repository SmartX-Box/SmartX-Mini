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
#import urllib, urllib2

from time import localtime, strftime




cmd ="curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=CREATE DATABASE 'Labs''"
subprocess.call([cmd], shell=True)

timeout = 100
actual_data=[]

consumer = KafkaConsumer('resource',bootstrap_servers=['<NUC IP>'])
partitions = consumer.poll(timeout)
while partitions == None or len(partitions) == 0:

        consumer = KafkaConsumer('resource', bootstrap_servers=['<NUC IP>:9091'])
        message = next(consumer)
        print(message.value)

        str1 = message.value

        str2 = str1.split(',')
 
        str3 = str2[0].split(':')[1] #memory

        str4 = str2[1].split(':')[1] #tx

        str5 = str2[2].split(':')[1] #rx

        str6 = str2[4].split(':')[1] #cpu_usage

        str7 = str2[5].split(':')[1] #tx_dropped

        str8 = str2[8].split(':')[1] #rxError

        str9 = str2[9].split(':')[1] #disk

        str10 = str2[10].split(':')[1] #rx_dropped

        str11 = str2[11].split(':')[1] #tx_dropped

        str12 = str2[12].split(':')[1] #time_stamp

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST memory=%s'" % (variables, str3)
        subprocess.call([cmd], shell=True)

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST tx=%s'" % (variables, str4)
        subprocess.call([cmd], shell=True)

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST rx=%s'" % (variables, str5)
        subprocess.call([cmd], shell=True)

        variables = "labs"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST CPU_Usage=%s'" % (variables, str6)
        subprocess.call([cmd], shell=True)

        variables = "str7"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST tx_dropped=%s'" % (variables, str7)
        subprocess.call([cmd], shell=True)

        variables = "str8"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST rxError=%s'" % (variables, str8)
        subprocess.call([cmd], shell=True)


        variables = "str8"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST disk=%s'" % (variables, str9)
        subprocess.call([cmd], shell=True)



        variables = "str8"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST rx_dropped=%s'" % (variables, str10)
        subprocess.call([cmd], shell=True)


        variables = "str8"
        cmd = "curl -i -XPOST 'http://localhost:8086/write?db=Labs' --data-binary '%s,host=Labs,region=GIST txError=%s'" % (variables, str11)
        subprocess.call([cmd], shell=True)


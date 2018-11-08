import Adafruit_DHT as dht
import urllib2
from time import sleep
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(('<NUC IP>',1337))
s = sock.recv(5441)

sock.close()

if s:
	h,t = dht.read_retry(dht.DHT11,4)
	print ('Temp={0:0.1f}*C Humidity={1:0.1f}%').format(t, h)
	f=open("./data.txt",'w')
	data =str(t) + " " + str(h)
	f.write(data)
	f.close
sleep(1)


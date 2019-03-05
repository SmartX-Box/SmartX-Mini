import Adafruit_DHT as dht
import urllib2
from time import sleep

def transfer():
        f=open("./data.txt",'r')
        line = f.readline()
        words = line.split(" ")
        print(words)
        urllib2.urlopen("http://<NUC IP>?temp="+words[0]+"humid="+words[1]).close
        f.close()

transfer()

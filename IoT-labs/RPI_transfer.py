import Adafruit_DHT as dht
from urllib.request import urlopen
from time import sleep

def transfer():
        f=open("./data.txt",'r')
        line = f.readline()
        words = line.split(" ")
        print(words)
        urlopen("http://<NUC IP>?temp="+words[0]+"humid="+words[1]).close
        f.close()

transfer()

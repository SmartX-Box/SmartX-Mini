#
# SmartX-mini Resource-level Monitoring Service
# smtxm.py
# Run Spark Streaming job
#

"""
 run SmartX-mini
    `$ sudo path/to/bin/spark-submit --jars path/to/spark-streaming-kafka-assembly_2.10-1.4.0.jar path/to/smtxm.py 192.168.10.10:2181 test`
"""

import os
import sys

from pymongo import MongoClient

from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print >> sys.stderr, "Usage: smtxm.py <zk> <topic> <mongodb>"
        exit(-1)

    sc = SparkContext(appName="SmartXmini")
    ssc = StreamingContext(sc, 1)

    zkQuorum, topic, dbinfo = sys.argv[1:]
    kvs = KafkaUtils.createStream(ssc, zkQuorum, "spark-streaming-consumer", {topic: 1})

    # Connect to MongoDB
    dbip, dbport = dbinfo.split(":")[0:]
    client = MongoClient(dbip, int(dbport))
    db = client.smartxdb

    # Process the data from kafka using Spark
    lines = kvs.map(lambda x: str(x[1]))
    status = lines.filter(lambda line: line.count(",") == 14) \
                  .map(lambda line: ('s' + line.split(",")[1], (line.split(",")[0], line.split(",", 2)[2])))
    
    def monitoring(data, num = 20):
        def insertdb(rdd):
            taken = rdd.take(num + 1)
            for record in taken[:num]:
		value = record[1][1].split(",")[0:]
                err = null

                # If an error is detected, set error code.
                if int(value[10]) > 80:
                    err = "11"

                db.smartx.update_one(
                    {"ip": record[0]},
                    {
                        "$set": {
                            "timestamp": int(record[1][0]),
                            "val1": float(value[0]),
                            "val2": float(value[1]),
                            "val3": float(value[2]),
                            "val4": int(value[3]),
                            "val5": int(value[4]),
                            "val6": int(value[5]),
                            "val7": int(value[6]),
                            "val8": int(value[7]),
                            "val9": int(value[8]),
                            "val10": int(value[9]),
                            "val11": int(value[10]),
                            "val12": int(value[11]),
                            "val13": int(value[12]),
                            "err": err
                        }
                    },
                    True
                )

        data.foreachRDD(insertdb)
        
    monitoring(status)

    ssc.start()
    ssc.awaitTermination()

const influx = require('influx')
var kafka = require('kafka-node');

// InfluxDB
var DB = new influx.InfluxDB({
    // single-host configuration
    host: 'testlabs-desktop',
    port: 8086, // optional, default 8086
    protocol: 'http', // optional, default 'http'
    username: 'admin',
    password: 'admin',
    database: 'labs'
});

var resourceKafka = new kafka.Client('testlabs-desktop:2181');
var resourceOffset = new kafka.Offset(resourceKafka);

resourceOffset.fetch([{
        topic: 'resource',
        partition: 0,
        time: -1,
        maxNum: 1
    },
    {
        topic: 'resource',
        partition: 1,
        time: -1,
        maxNum: 1
    },
    {
        topic: 'resource',
        partition: 2,
        time: -1,
        maxNum: 1
    }
], function(err, data) {
    var resourceConsumer = new kafka.Consumer(resourceKafka, [{
            topic: 'resource',
            partition: 0,
            offset: data['resource'][0][0]
        },
        {
            topic: 'resource',
            partition: 1,
            offset: data['resource'][1][0]
        },
        {
            topic: 'resource',
            partition: 2,
            offset: data['resource'][2][0]
        }
    ], {
        autoCommit: false,
        fromOffset: true
    });

    resourceConsumer.on('message', function(message) {
        var messageJSON = JSON.parse(message.value);

        DB.writePoints([{
            measurement: 'resource',
            tags: {
                ip: messageJSON.ip,
                deviceId: messageJSON.deviceId,
                timestamp: messageJSON.timestamp,
                cp: messageJSON.cp
            },
            fields: {
                memory: messageJSON.memory,
                tx: messageJSON.tx,
                rx: messageJSON.rx,
                cpu: messageJSON.cpu,
                txDropped: messageJSON.txDropped,
                rxError: messageJSON.rxError,
                disk: messageJSON.disk,
                rxDropped: messageJSON.rxDropped,
                txError: messageJSON.txError
            },
        }])

    });

});

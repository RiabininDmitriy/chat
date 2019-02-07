http = require('http');

var history = [];

var errorMessages = {
   "0": "All fine",
   "-1": "No space left in DB",
   "-2": "Wrong data",
   "-3": "Apocalypse",
   "-4": "REALLY Wrong data",
};

var RPCFuncs = {
    getMessages: function(data){
        var messageId = +data.messageId;
        return history.slice(messageId);
    },
    addMessage:  function(data){
        history.push(data);
    }
};

server = http.createServer(function(req, res){
    if (req.method == "POST"){
        var body = '';
        req.on('data', function (data) {
                body += data;
        });
        req.on('end', function () {
                console.log("Body: " + body);
                try{
                    var data = JSON.parse(body);
                }
                catch (e){
                    console.log("wrong JSON");
                    var errorCode = -4;
                    res.end(JSON.stringify({errorCode: errorCode, errorMessage: errorMessages[errorCode]}));
                    return;
                }
                var timestamp =(new Date()).getTime(); 
                //var errorCode = 0 - Math.floor(Math.random()*4)
                //res.end(JSON.stringify({errorCode: errorCode, errorMessage: errorMessages[errorCode]}));
                if ("func" in data){
                    if (data.func in RPCFuncs){
                        var func = data.func;
                        delete data.func;
                        data.timestamp = timestamp;
                        var result = {data: RPCFuncs[func](data), nextMessageId: history.length};
                        console.log("answer on request:");
                        console.log(JSON.stringify(result));
                        res.end(JSON.stringify(result));
                    }
                    else {
                        console.log("no func in functions array" + body);
                    }
                }
                else {
                    console.log("no func key in data:" + body);
                }
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, {'Content-Type': 'text/json'});
        //res.end('post received');
    }
});

port = 8070;
host = '164.138.30.21';
server.listen(port, host);
console.log("Listen...");
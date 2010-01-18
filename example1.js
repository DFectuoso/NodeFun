var sys = require('sys'), 
   http = require('http');

function ping(port){
  var request = http.createClient(port, "127.0.0.1").request("GET", "/");
  request.finish(function (response) {
    response.addListener("body", function (chunk) {
      response.setBodyEncoding("utf8");
      //sys.puts("BODY: " + chunk);
    });
  });  
}


http.createServer(function (req, res) {
  setTimeout(function () {
    res.sendHeader(200, {'Content-Type': 'text/plain'});
    res.sendBody('I am server 1');
    res.finish();
    ping(8001);
  }, 500);
}).listen(8000);

http.createServer(function (req, res) {
  setTimeout(function () {
    res.sendHeader(200, {'Content-Type': 'text/plain'});
    res.sendBody('I am server 2');
    res.finish();
    ping(8000);
  }, 500);
}).listen(8001);

setTimeout(function() {ping(8000);},2000);
var memoryUsage = function(){
  sys.puts(sys.inspect(process.memoryUsage()));
  setTimeout(memoryUsage,10000);
}
memoryUsage();
sys.puts('Server running at http://127.0.0.1:8000/');


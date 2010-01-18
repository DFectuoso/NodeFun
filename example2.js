var http = require('http'),
    multipart = require('multipart'),
    sh = require('./showdown');
  
var form = "<html><body><form method='post'><textarea name='text'></textarea><input type='submit'/></form></body></html>";

   http.createServer(function (req, res) {
     // grab post content
     var post = "";
     req.addListener("body", function(chunk) { 
          post += chunk; });
     // convert & respond
     req.addListener("complete",
       function() {
         res.sendHeader(200, {'Content-Type': 
                              'text/html'});
         if(post == ""){
           res.sendBody(form)
         } else {
           var src = require("querystring").parse(post)["text"];
           res.sendBody(src);
           res.sendBody(sh.Showdown.converter.makeHtml(src));
         }
         res.finish();
      });
    }).listen(8000);
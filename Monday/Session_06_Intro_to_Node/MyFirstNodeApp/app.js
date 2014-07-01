var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    
    //Write the the response header with a status code of 200 (For HTTP OK)
    //And with a plain text content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    fs.readFile("data.json", "UTF-8", function (err, data) {
        
            if (err) {
                console.error(err);
            }
            else {
                //end() will write the specified string to the response
                var contentObject = JSON.parse(data.trim());
                
                res.end('The location of ' + contentObject.description + ' is located at ' + '(' + contentObject.properties.longitude + ', ' + contentObject.properties.latitude + ')');  
            }
        }
    );
}).listen(port);


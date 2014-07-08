var unirest = require('unirest');

/*
    GET /api/etd
*/
exports.list = function (req, res) {
    

    unirest.get("http://bartjson.azurewebsites.net/api/etd.aspx?cmd=etd&orig=ALL&key=" + process.env.API_KEY, function (apiResponse) {
        
        if (apiResponse.error) {
            //there was an error. Indicate to the client what went wrong
            res.send(500, { message: apiResponse.error });
            return;
        }

        res.send(apiResponse.body);
    
    });

}

/*
    GET /api/:id(<STATION_ABBREVIATION>)
*/
exports.get = function (req, res) {

    //the id part of the route
    var station = req.params.id;
    
    //pass the origin parameter set to the station name
    unirest.get("http://bartjson.azurewebsites.net/api/etd.aspx?cmd=etd&orig=" + station + "&key=" + process.env.API_KEY, function (apiResponse) {
        
        if (apiResponse.error) {
            //there was an error. Indicate to the client what went wrong
            res.send(500, { message: apiResponse.error });
            return;
        }
        
        res.send(apiResponse.body);
    
    });

}
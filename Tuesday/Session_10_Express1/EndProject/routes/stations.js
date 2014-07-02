var unirest = require('unirest');
var stable = require('stable');
/*
* GET /api/stations
*/
exports.get = function (req, res) {
    unirest.get('http://bartjson.azurewebsites.net/api/stn.aspx?key=' + process.env.API_KEY, function (apiResponse) {
        if (apiResponse.error) {
            
            //indicate to the caller that there was an internal server error (code 500) and sent the error message
            res.send(500, { message: apiResponse.error });
            return;
        }
        
        if (req.query.lat && req.query.lon) {
            //caller specified a reference location
            res.send(sortByLocation(req.query.lat, req.query.lon, apiResponse.body));
        }
        else {
            res.send(apiResponse.body);
        }
        
    });
}

/**
    Sorts a given array of stations with the first element being the closest statioand the
    last being the farthest. Returns the sorted array
**/
function sortByLocation(lat, lon, stationData) {
    
    //compute distances from point
    for (var i in stationData) {
        var stationObject = stationData[i];
        //calculate distance from point and add data to each station
        stationObject.distance = Math.sqrt(Math.pow(lat - stationData[i].latitude, 2) + Math.pow(lon - stationData[i].longitude, 2));
    }
    //the function that defines the comparison between 2 stations
    
    return stable(stationData, function (a, b) {
        return a.distance > b.distance;
    });
}

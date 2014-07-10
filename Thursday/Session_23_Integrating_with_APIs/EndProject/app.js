
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var unirest = require('unirest');
var app = express();
var serviceRoot = 'http://api.skybiometry.com/fc/';
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.render('index');
});
app.post('/phototrain', function (req, res) {
    
    unirest.get(serviceRoot + "faces/detect?api_key=" + process.env.API_KEY + "&api_secret=" + process.env.API_SECRET + "&urls=" + req.body.pictures
    , function (faceDetectResponse) {
        
        if (faceDetectResponse.error) {
            return res.send(500, { message : faceDetectResponse.error });
        }
        
        var body = faceDetectResponse.body;
        var tags = "";
        for (var i in body.photos) {
            
            if (body.photos[i].tags) {
                //we make the enforcement tha the client only sends pictures of people with only 1 face in it.
                //we do this because we don't want to deal with the complexity of multiple faces in training pictures
                if (body.photos[i].tags.length > 1) {
                    response.send(400, { message: 'You must send photos with clearly only 1 face in it. This photo has more than one face ' + body.photos[i].url });
                    return;
                }
                
                if (body.photos[i].tags.length === 1) {
                    tags += body.photos[i].tags[0].tid + ',';
                }
                //0 tags just means no faces detected
            }
        }
        console.log('Got the tag ids: ' + tags);
        
        //check if we didn't get any faces at all. If so, error out.
        if (tags.length == 0) {
            response.send(400, { message: 'None of the photos you sent had faces in it. ' + body.photos[i].url });
            return;
        }
        
        //save the tags tagged as the name provided
        unirest.get(serviceRoot + "tags/save?api_key=" + process.env.API_KEY + "&api_secret=" + process.env.API_SECRET + "&uid=" + req.body.name + '@' + 'mainnamespace' + "&tids=" + tags,
        function (tagSaveResponse) {
            
            //if we have an error return back a 500 error to the client
            if (tagSaveResponse.error) {
                return res.send(500, tagSaveResponse.error);
            }

            //now execute the training for the set of images provided for the face
            unirest.get(serviceRoot + "faces/train?api_key=" + process.env.API_KEY + "&api_secret=" + process.env.API_SECRET + "&uids=" + req.body.name + '@' + 'mainnamespace',
            function (faceTrainResponse) {

                if (tagSaveResponse.error) {
                
                    return res.send(500, faceTrainResponse.error);
                
                }

                for (var i in faceDetectResponse.body.photos) {
                    
                    //api will resize images to max width/height of 1024. However it won't reflect that in width/height
                    //field of each photo returned. So change it here
                    var photo = faceDetectResponse.body.photos[i];
                    
                    //remember, we assume 1 tagged face in each photo
                    var tag = photo.tags[0];
                    
                    //coordinates of interesting points are returned in percentages and
                    //need to be re-calculated as absolute positions before rendering
                    tag.eye_left.x = (tag.eye_left.x / 100) * photo.width;
                    tag.eye_left.y = (tag.eye_left.y / 100) * photo.height;
                    tag.eye_right.y = (tag.eye_right.y / 100) * photo.height;
                    tag.eye_right.x = (tag.eye_right.x / 100) * photo.width;
                    tag.mouth_center.x = (tag.mouth_center.x / 100) * photo.width;
                    tag.mouth_center.y = (tag.mouth_center.y / 100) & photo.height;
                    tag.nose.x = (tag.nose.x / 100) * photo.width;
                    tag.nose.y = (tag.nose.y / 100) * photo.height;
                    
                }
                //return the list of images that were sucessfully used for training
                res.render('imageTraining', { data: faceDetectResponse.body });
            });

        });

    });

});

app.post('/photorec', function (req, res) {
    unirest.get(serviceRoot + "faces/recognize?api_key=" + process.env.API_KEY + 
        "&api_secret=" + process.env.API_SECRET + "&uids=all" + "&urls=" + 
        req.body.picture + "&namespace=" + 'mainnamespace' + "&detector=aggresive&attributes=none&limit=3",
    function (response) {

        if (response.error) {
            res.send(500, response.error);
        }
        //because the API can return a success error code but not recognize any face we need to
        //check if we got a picture with a face detected.
        else if (!response.body.photos[0].tags || !response.body.photos[0].tags[0]) {
            res.send(400, { message: 'sorry, no photos detected in this image' });
        }

        //there will only be 1 photo and 1 face in it
        var tag = response.body.photos[0].tags[0];
        
        //if a tag has any uids, it means that the api has some guesses about who this is!
        if (tag.uids) {
            
            res.render('imageAnalysis', { photoUrl: response.body.photos[0].url, uids: tag.uids });
        
        }
        else {
            res.send(400, { message: 'The API has no guesses as to who is in the photo' });
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

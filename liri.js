require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);


var fs  = require("fs"); 
var request = require("request");



var nodeArgs = process.argv;

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        anyName = anyName + "+" + nodeArgs[i];
    }
    else {
        anyName += nodeArgs[i];
    }
}
if (!anyName) {
    anyName = 'mr nobody'
}
var commandName = process.argv[2];
console.log(commandName);
if (commandName === 'movie-this') {
    movieThis();
} 
else if (commandName === 'spotify-this') {
    spotifyThis();
}
else if (commandName === 'concert-this') {
    concertThis();
}
else if (commandName === 'do-what-it-says') {
    doWhat();
}
function concertThis() {
    console.log('do concert stuff');
}
function movieThis() {
    console.log('do movie stuff');
}
function spotifyThis() {
    console.log('spotify some song');
}
function doWhat() {
    console.log('do-what-it-says');
}
function movieThis() {

    var omdbUrl = keys.omdbKey.provider + anyName + keys.omdbKey.apiKey
    console.log(omdbUrl);
    request(omdbUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Ratings);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Actors);
        }
    });
}
function spotifyThis() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: keys.spotifyKey.myId,
        secret: keys.spotifyKey.secretId
    });
    spotify.search({ type: 'track', query: anyName, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
        
    });
}
function concertThis() {
    var bandsintown = require('bandsintown')("codingbootcamp");
    bandsintown
        .getArtistEventList(anyName)
        .then(function (events) {
            console.log(events[0].venue.name);
            console.log(events[0].venue.city + ", " + events[0].venue.country);
            console.log(moment(events[0].datetime).format('MM/DD/YYYY'));
        });
}
function doWhat (){
    var fs = require("fs");

fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);

});
}
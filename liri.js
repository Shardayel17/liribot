require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);


var fs = require("fs");
var request = require("request");




var nodetask = process.argv[2];
console.log(nodetask);


if (nodetask === 'movie-this') {
    var moviename = process.argv[3];
    if (moviename === undefined) {
        moviename = "mr nobody"
    }
    moviefunction(moviename);
}



else if (nodetask === 'concert-this') {
    concertfunction();
}

else if (nodetask === 'spotify-this-song') {
    var Songname = process.argv[3];
    if (Songname === undefined) {
        Songname = "The Sign"
    }
    MusicFunction(Songname);
}

else if (nodetask === 'do-what-it-says') {
    random();
}


function concertfunction() {
    console.log('Concert Info');
}


function moviefunction() {
    console.log('Movie Info');
}


function MusicFunction() {
    console.log('Song Info');
}

function random() {
    console.log('Do this');
}




function moviefunction(moviename) {
    var queryurl = "http://www.omdbapi.com/?apikey=trilogy&t=" + moviename;
    request(queryurl, function (error, response, body) {
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



function MusicFunction(Songname) {
    spotify.search({ type: 'track', query: Songname, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Something Went Wrong: ' + err);
        }
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
    });
}



function concertfunction() {
    var bandsintown = require('bandsintown')("codingbootcamp");
    bandsintown
        .getArtistEventList(Title)
        .then(function (events) {
            console.log(events[0].venue.name);
            console.log(events[0].venue.city + ", " + events[0].venue.country);
            console.log(moment(events[0].datetime).format('MM/DD/YYYY'));
        });
}// api key 657c4011f7c79a05857eab902825eaf8






function random() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);

    });
}
require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);


var fs = require("fs");
var request = require("request");



// var argument = process.argv;
// var Title = "";


// for (var i = 3; i < argument.length; i++) {
//     if (i > 3 && i < argument.length) {
//         Title = Title + "+" + argument[i];
//     }
//     else {
//         Title += argument[i];
//     }
// }


// if (!Title) {
//     Title = 'mr nobody'
// }

var nodetask = process.argv[2];
console.log(nodetask);

//if user enters a movie request, carryout movie function
if (nodetask === 'movie-this') {
    var moviename = process.argv[3];
    if (moviename===undefined){
        moviename= "mr nobody"
    }
    moviefunction(moviename);
}


//if user enters a concert request, carryout concert function
else if (nodetask === 'concert-this') {
    concertfunction();
}
//if user enters a music request, carryout music function
else if (nodetask === 'spotify-this') {
    MusicFunction();
}

else if (nodetask === 'do-what-it-says') {
    random();
}

//function to reach out to bands in town API
function concertfunction() {
    console.log('Concert Info');
}

//function to reach out to OMDB
function moviefunction() {
    console.log('Movie Info');
}

//function to reach out to spotify
function MusicFunction() {
    console.log('Song Info');
}

function random() {
    console.log('Do this');
}




function moviefunction(moviename) {

    var queryurl = "http://www.omdbapi.com/?apikey=trilogy&t="+ moviename; 

    // var MV = keys.omdbKey.provider + Title + keys.omdbKey.apiKey
    // console.log(MV);
    
    request(queryurl,function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body).Title);
            // console.log(JSON.parse(body).Year);
            // console.log(JSON.parse(body).Plot);
            // console.log(JSON.parse(body).Ratings);
            // console.log(JSON.parse(body).Language);
            // console.log(JSON.parse(body).Country);
            // console.log(JSON.parse(body).Actors);

            var jsonbody = JSON.parse(body)
            console.log (jsonbody);
        }
    });
}



function MusicFunction() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: keys.spotifyKey.myId,
        secret: keys.spotifyKey.secretId
    });
    spotify.search({ type: 'track', query: Title, limit: 5 }, function (err, data) {
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
}






function random() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);

    });
}
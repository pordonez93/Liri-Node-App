require("dotenv").config();
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');
var spotify = new Spotify(keys.spotify);
var liriArgument = process.argv[2];
var liriSubject = process.argv.slice(3).join(" ");

switch(liriArgument) {
    case"spotify-this-song":
    spotifySong(liriSubject);
    break;
    
    case "concert-this":
    concertThis(liriSubject);
    break;

    case"movie-this":
    movieThis(liriSubject);
    break;

    case "do-what-it-says":
    iWantItThatWay();
    break;

    default:
        console.log(`
        Type one of the following commands after node.js: 
        1. spotify-this-song <any song name>
        2. concert-this <any artist/band name>
        3. movie-this <any movie name>
        4. do-what-it-says
        Make sure to put the name of the song/artist/movie
        in qutation marks if it is more than one word!`);
};

function spotifySong(songName){
    if(!songName){
        songName = "The Sign by Ace of Base";
    }spotify.search({
        type:"track",
        query: songName
    }, function(err, data){
        if(err){
            console.log('Error occurred: ' + err);
            return;
        }else{
            output =
            "Song Name: " + songName.toUpperCase() + "\r\n" +
            "Album Name: " + data.tracks.items[0].album.name + "\r\n"+
            "Artist Name: " + data.tracks.items[0].album.artists[0].name + "\r\n" +
            "URL: " + data.tracks.items[0].album.external_urls.spotify;

            console.log(output);
        }
    })
}

function concertThis (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
    .then(function(response){
        output = 
        "Venue: " + response.data[0].venue.name + "\r\n" +
        "Location: " + response.data[0].venue.city + "\r\n" +
        "Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY");

        console.log(output);
    })
}



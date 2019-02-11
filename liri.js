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
    spotifyThis(liriSubject);
    break;
    
    case "concert-this":
    concertThis(liriSubject);
    break;

    case"movie-this":
    movieThis(liriSubject);
    break;

    case "do-what-it-says":
    randomThis();
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

function spotifyThis(songName){
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

function movieThis(movieName){
    if(!movieName) {
        movieName = "Mr Nobody";
    }
    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=749f962f";

    request(queryURL, function(err, response, body){
        if(err) {
            console.log('Error occurred: ' + err);
            return;
        }else{
            let jsonData = JSON.parse(body);

            output=
            "Title: " + jsonData.Title + "\r\n" +
            "Year: " + jsonData.Year + "\r\n" +
            "IMDB Rating: " + jsonData.imdbRating + "\r\n" +
            "Rotten Tomatoes Rating: " +jsonData.Ratings[1].Value + "\r\n" +
            "Country: " + jsonData.Country + "\r\n" +
            "Language: " + jsonData.Language + "\r\n" +
            "Plot: " + jsonData.Plot + "\r\n" +
            "Actors: " + jsonData.Actors + "\r\n";

            console.log(output);
        }
    })
}

function randomThis(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err) {
            console.log('Error occurred: ' + err);
            return;
        }else{
            randomThisResults = data.split(",");
            spotifyThis(randomThisResults[1]);
        }
    })
};


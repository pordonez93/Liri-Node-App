# Liri-Node-App

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

![Screenshot Image](../images/node-liri-app.png)

*   LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

###Concert-This
   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

![Screenshot Image of Output](../images/concert-this.png)

###Spotify-This-Song
   * This will show the following information about the song in your terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
   * If no song is provided then your program will default to "The Sign" by Ace of Base.

![Screenshot image of Spotify Output](../images/spotify-this-song.png)

###Movie-This
   * This will output the following information to your terminal/bash window:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
   * If the user doesn't type a movie in, the program will output data for      the movie 'Mr. Nobody.'

   ![Screenshot image of Movie output](../images/movie-this.png)

###Do-What-It-Says
    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call        one of LIRI's commands.
    * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

![Screenshot image of function output](../images/do-what-it-says.png)
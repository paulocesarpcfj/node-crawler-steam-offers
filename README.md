# node-crawler-steam-offfers

### What Is?

That's a Node application that enter at the game's offers page at Steam and creates a JSON file with 
all these promotions filtered by the percent of the offer and by Brazilian Real.

### Why?

The objective is to creates a JSON file that will be readed by a Chrome Extension to list all the promotions without needing
to enter at Steam's Website. It does help who can't access the Steam website maybe because of Proxy blocker.

### Dependencies

[NodeJS](https://nodejs.org/en/) <br />
[Cheerio](https://github.com/cheeriojs/cheerio) <br />
[Request](https://github.com/request/request) <br />
[Express](http://expressjs.com/) <br />

### How to Install

Clone the project and run `npm install` to install the dependencies and then run `node crawler.js` to create the JSON file.

Created by [paulocesarpcfj](https://github.com/paulocesarpcfj) - 2017

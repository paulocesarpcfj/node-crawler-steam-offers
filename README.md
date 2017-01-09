# node-crawler-steam-offers

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

### How to Install and Use

#### Dev
Clone the project and run `npm install` to install the dependencies and then run `node start` to up the server. Access `localhost:8080` to generate the JSON file.<br />

#### Prod
If you don't want to generate the JSON file manually, there's a Heroku APP uploaded, which has a Cron-Job creating the JSON file every 30 minutes. Just access this page to get the automatically generated JSON file, or access this page to generate the file manually at Heroku APP.

If you don't want to generate the JSON file manually, there's a [Heroku APP](https://www.heroku.com/) uploaded, which has a [Cron-Job](https://cron-job.org/en/) creating the JSON file every 30 minutes. Just access [this page](https://node-crawler-steam-offers.herokuapp.com/api/offers.json) to get the automatically generated JSON file

To generate the JSON manually at Heroku APP, access [this page](https://node-crawler-steam-offers.herokuapp.com/) and then [this page https://node-crawler-steam-offers.herokuapp.com/](https://node-crawler-steam-offers.herokuapp.com/) to get the new JSON.

Created by [paulocesarpcfj](https://github.com/paulocesarpcfj) - 2017

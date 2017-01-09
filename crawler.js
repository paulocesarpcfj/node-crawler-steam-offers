var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();
var DATA = { results: []};
var URL_STEAM;

function getOffers(actualPage = 1) {
    URL_STEAM = 'http://store.steampowered.com/search/results?sort_by=Price_ASC&category1=998&specials=1&page=' + actualPage;

    request(URL_STEAM, function(err, res, body) {
        if(err) console.log('Erro: ' + err);

        var $ = cheerio.load(body);

        var maxPages = parseInt($('.search_pagination_right a.pagebtn:last-child').prev().text());

        $('#search_result_container > div > a').each(function() {
            var link = $(this).attr('href');
            var image = $(this).find('.search_capsule img').attr('src');
            var title = $(this).find('.title').text().trim();
            var discount = $(this).find('.search_discount > span').text().trim();
            var oldPrice = $(this).find('.discounted > span > strike').text().trim();
            var newPrice = "R$ " + $(this).find('.discounted').text().trim().split('R$').pop().trim();

            console.log(newPrice)

            DATA.results.push(
                {
                    link,
                    image,
                    title,
                    discount,
                    oldPrice,
                    newPrice
                }
            );

            fs.writeFile('offers.json', JSON.stringify(DATA));
        });

        if(actualPage <= maxPages) {
            getOffers(++actualPage);
        }
    });
};

app.get('/', function (req, res) {
    getOffers();
    res.send("Last update - " + new Date().toLocaleString());
});

app.use('/api', express.static(__dirname));

var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Listening on ' + port);
});
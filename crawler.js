var express = require('express');
var promise = require('request-promise');
var cheerio = require('cheerio');
var cors = require('cors');

var app = express();

function getOffers(page) {
    var DATA = { results: [] };
    var URL_STEAM = 'http://store.steampowered.com/search/results?sort_by=Price_ASC&category1=998&specials=1&cc=br&page=' + page;

    var request = {
        method: 'GET', 
        uri: URL_STEAM,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    return promise(request)
        .then(function($) {
            $('#search_result_container > div > a').each(function() {
                var link = $(this).attr('href');
                var image = $(this).find('.search_capsule img').attr('src');
                var title = $(this).find('.title').text().trim();
                var discount = $(this).find('.search_discount > span').text().trim();
                var oldPrice = $(this).find('.discounted > span > strike').text().trim();
                var newPrice = "R$ " + $(this).find('.discounted').text().trim().split('R$').pop().trim();

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
            });
        })
        .then(function() { return JSON.stringify(DATA) })
        .catch(function(err) {
            console.log('Erro: ' + err);
        });
};

app.use(cors());

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    getOffers(req.query.page)
        .then(function(offers) {
            res.send(offers);
        });
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Listening on ' + port);
});
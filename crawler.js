var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var MAX_PAGES = 1;
var ACTUAL_PAGE = 1;
var DATA = { results: []};
var URL_STEAM;

function getOffers() {
    URL_STEAM = 'http://store.steampowered.com/search/?sort_by=Price_ASC&category1=998&specials=1&page=' + ACTUAL_PAGE;

    request(URL_STEAM, function(err, res, body) {
        if(err) console.log('Erro: ' + err);

        var $ = cheerio.load(body);

        MAX_PAGES = parseInt($('.search_pagination_right a.pagebtn:last-child').prev().text());

        $('#search_result_container > div > a').each(function() {
            var image = $(this).find('.search_capsule img').attr('src');
            var title = $(this).find('.title').text().trim();
            var discount = $(this).find('.search_discount > span').text().trim();
            var oldPrice = $(this).find('.discounted > span > strike').text().trim();
            var newPrice = $(this).find('.discounted > span + br')[0].next.data.trim();

            DATA.results.push(
                {
                    image,
                    title,
                    discount,
                    oldPrice,
                    newPrice
                }
            );

            fs.writeFile('offers.json', JSON.stringify(DATA));
        });

        if(ACTUAL_PAGE ++ <= MAX_PAGES) {
            getOffers();
        }
    });
}

getOffers();
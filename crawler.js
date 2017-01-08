var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var MAX_PAGES = 15;
var ACTUAL_PAGE = 1;
var DATA = { results: []};

while (ACTUAL_PAGE <= MAX_PAGES) {
    var URL_STEAM = 'http://store.steampowered.com/search/?sort_by=Price_ASC&category1=998&specials=1&page=' + ACTUAL_PAGE;

    request(URL_STEAM, function(err, res, body) {
        if(err) console.log('Erro: ' + err);

        var $ = cheerio.load(body);

        //var MAX_PAGES = $('.search_pagination_right a.pagebtn').prev().text();

        $('#search_result_container > div > a').each(function() {
            var title = $(this).find('.title').text().trim();

            DATA.results.push({ title: title });

            fs.writeFile('offers.json', JSON.stringify(DATA), 'utf8');
        });

    })

    ACTUAL_PAGE ++;
};

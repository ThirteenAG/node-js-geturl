"use strict";
let cheerio = require('cheerio');
var url = require('url');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var pUrl = url.parse(request.url, true).query['url'];
  var pSelector = url.parse(request.url, true).query['selector'];

  console.log("Url: " + pUrl);
  console.log("Selector: " + pSelector);

  if ((typeof pUrl != 'undefined') && (typeof pSelector != 'undefined'))
  {
    pUrl = pUrl.substr(1, pUrl.length - 2);
    pSelector =  pSelector.substr(1, pSelector.length - 2);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    	if (this.readyState === 4) {
        console.log("Complete.\nBody length: " + this.responseText.length);
        //console.log("Body:\n" + this.responseText);
        let $ = cheerio.load(this.responseText);
        var object = $('<div/>').html($.html()).contents();
        var link = object.find(pSelector).attr("href");

        console.log("link: " + link);

        response.send(link);
    	}
    };

    xhr.open("GET", pUrl);
    xhr.send();
  }
  else
    response.send("");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

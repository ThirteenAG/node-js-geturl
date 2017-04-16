"use strict";
let cheerio = require("cheerio");
var url = require("url");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require("express");
var app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response) {
  var pUrl = url.parse(request.url, true).query["url"];
  var pSelector = url.parse(request.url, true).query["selector"];
  var pRedirect = url.parse(request.url, true).query["redirect"];

  console.log("Url: " + pUrl);
  console.log("Selector: " + pSelector);

  if (typeof pUrl != "undefined" && typeof pSelector != "undefined") {
    if (isBalanced(pUrl) === true && isBalanced(pSelector) === true) {
      pUrl = pUrl.substr(1, pUrl.length - 2);
      pSelector = pSelector.substr(1, pSelector.length - 2);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          console.log("Complete.\nBody length: " + this.responseText.length);
          //console.log("Body:\n" + this.responseText);
          let $ = cheerio.load(this.responseText);
          var object = $("<div/>").html($.html()).contents();
          try {
            var link = object.find(pSelector);
            if (typeof pRedirect == "undefined") {
              response.send(link.attr("href"));
            } else {
              response.writeHead(307, {
                Location: link.attr("href")
              });
              response.end();
            }
          } catch (exc) {
            response.send("");
          }
        }
      };

      xhr.open("GET", pUrl);
      xhr.send();
    } else response.send("");
  } else response.send("");
});

app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"));
});

var haveSameLength = function(str, a, b) {
  return (str.match(a) || []).length === (str.match(b) || []).length;
};

var isBalanced = function(str) {
  var arr = [[/\(/gm, /\)/gm], [/\{/gm, /\}/gm], [/\[/gm, /\]/gm]],
    i = arr.length,
    isClean = true;

  while (i-- && isClean) {
    isClean = haveSameLength(str, arr[i][0], arr[i][1]);
  }
  return isClean;
};

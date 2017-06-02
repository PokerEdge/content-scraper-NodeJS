'use strict';

const Xray = require('x-ray');
const json2csv = require('json2csv');
const fs = require('fs');
const schedule = require('node-schedule');

//Check for directory named 'data'. If that directory does not exist, create that directory.
const dir = './data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//Fields should be in this order: Title, Price, ImageURL, URL, and Time
let fields = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];
let scrapeData = [];

const x = Xray();
const productPageURL = "http://shirts4mike.com/shirts.php";

// Get the price, title, url and image url from the product page with x-ray module
x(productPageURL, '.products a',
  [{
    'Title': x('.products a@href', 'title'),
    'Price': x('.products a@href', '.price'),
    'ImageURL': 'img@src',
    'URL': '@href'
  }]
)((err, obj) => {

  let currentDate = new Date();
  var itemRow = {};
  var csvName = currentDate.getFullYear().toString() + "-" +
               (currentDate.getMonth()+1).toString() + "-" +
                currentDate.getDate().toString();

  //Handle connectivity and other errors by displaying a user friendly message in console
  if(err){

    console.error(`There’s been an error: ${err.code}. Cannot connect to ${productPageURL}.`);

    //Send an error log to an error log file called "scraper-error.log" with time stamp
    fs.appendFileSync(`./data/scraper-error.log`, `[${currentDate.toString()}] <${err.code}>`);
    return;
  }

  //Loop through all scraped data to populate each item row
  for(let i=0; i<obj.length; i++){

    itemRow = {};

    itemRow.Title = obj[i].Title;
    itemRow.Price = obj[i].Price;
    itemRow.ImageURL = obj[i].ImageURL;
    itemRow.URL = obj[i].URL;
    itemRow.Time = csvName;

    //Add "row" of scraped and organized data to the scrapeData array
    scrapeData.push(itemRow);
  }

  let csv = json2csv({ data: scrapeData, fields: fields, quotes: '' });

  fs.writeFile(`./data/${csvName}.csv`, csv, function(err) {
    if (err) throw err;
    console.log(`${csvName}.csv saved`);
  });
})

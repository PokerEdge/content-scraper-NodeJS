'use strict';

//If you’re shooting for the "Exceeds Expectations" grade, it is recommended that you mention so in your submission notes.


//The other package should create the CSV file.
  //Chose json2csv to scrape content and as a module that has several downloads and recent updates

const Xray = require('x-ray');
const json2csv = require('json2csv');
const fs = require('fs');

//Check for director named 'data'. If directory does not exist, create directory.
const dir = './data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//Fields should be in this order: Title, Price, ImageURL, URL, and Time
let fields = [];
// ['Title', 'Price', 'ImageURL', 'URL', 'Time'];

// Get the price, title, url and image url from the product page
const x = Xray();
const productPageURL = "http://shirts4mike.com/shirts.php";

//WRITES OUTPUT TO JSON FILE AND THIS IS WHERE json2csv WOULD BE USED
// .write('results.json');


x(productPageURL, '.products a',
  [{
    'Title': x('.products a@href', 'title'),
    'Price': x('.products a@href', '.price'),
    'ImageURL': 'img@src',
    'URL': '@href'
  }]
)(function(err, obj){


  //On error
    //If needed, convert error to user friendly message
      //Display message to user (in console)
    //Send err to error log file with time stamp

    //They should be in this order: Title, Price, ImageURL, URL, and Time
    for(let i=0; i<obj.length; i++){

      //Store values as an array of objects JSON to be added to CSV row, e.g.
      /*
              var myCars = [
          {
            "car": "Audi",
            "price": 40000,
            "color": "blue"
          }, {
            "car": "BMW",
            "price": 35000,
            "color": "black"
          }, {
            "car": "Porsche",
            "price": 60000,
            "color": "green"
          }
        ];
      */

      /*
      let shirtInfo = {};
                shirtInfo.Title = title;
                shirtInfo.Price = price;
                shirtInfo.ImageUrl = relativeImageUrl;
                shirtInfo.Url = imageUrl;
                shirtInfo.Time = scrapeTime;
      */

      fields.push(obj[i]); //NOT LOADING KEY VALUE PAIRS SYNCHRONOUSLY

      // console.log(obj[i].href);
      // console.log(obj[i].imageURL);
      // console.log(obj[i].title);
      // console.log(obj[i].price);

      // console.log(obj[i]);

      //Make new line in CSV
    }

    console.log(fields);

    let csvName = new Date().getFullYear().toString() + "-" + (new Date().getMonth()+1).toString() + "-" + new Date().getDate().toString();
    console.log(csvName);
})

// Export product data to CSV file in dir './data' in a particular order (see below)
  //The information should be stored in an CSV file that is named for the date it was created
  //e.g. 2016-11-21.csv (year-month-day.csv)
    //Done

// Assume that the the column headers in the CSV need to be in a certain order
  // to be correctly entered into a database.
  // They should be in this order: Title, Price, ImageURL, URL, and Time

// If your program is run twice
  // overwrite the data in the CSV file with the updated information.

// If http://shirts4mike.com is down, an error message describing the issue
  //should appear in the console.
// The error should be human-friendly, such as “There’s been a 404 error.
  // Cannot connect to the to http://shirts4mike.com.”
//To test and make sure the error message displays as expected, you can disable the
  //wifi on your computer or device.


// Edit your package.json file so that your program runs when the 'npm start' command is run.


// When an error occurs, log it to a file named scraper-error.log .
  //It should append to the bottom of the file with a time stamp and error
  //e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>

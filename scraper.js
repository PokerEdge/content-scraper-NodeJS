'use strict';

//If you’re shooting for the "Exceeds Expectations" grade, it is recommended that you mention so in your submission notes.


//The other package should create the CSV file.
  //Chose json2csv to scrape content and as a module that has several downloads and recent updates

const Xray = require('x-ray');
const json2csv = require('json2csv');
const fs = require('fs');
const schedule = require('node-schedule');

//Check for director named 'data'. If directory does not exist, create directory.
const dir = './data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//Fields should be in this order: Title, Price, ImageURL, URL, and Time
let csvFields = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];
let fields = [];

const x = Xray();
const productPageURL = "http://shirts4mike.com/shirts.php";

// Get the price, title, url and image url from the product page
x(productPageURL, '.products a',
  [{
    'Title': x('.products a@href', 'title'),
    'Price': x('.products a@href', '.price'),
    'ImageURL': 'img@src',
    'URL': '@href'
  }]
)((err, obj) => {

  let currentDate = new Date();

  //Handle error
  if(err){
    //On 404 do the below
      //Create error file if error file doesn't exist
        //Done with fs.appendFileSync() by default


    //If needed, convert error to user friendly message

    //Display error message to user (in console)
    console.error(`There’s been an error: ${err.code}. Cannot connect to ${productPageURL}.`);
    // console.error(`Oops! There was an error: (${err.code})`);

    //Send err to error log file with time stamp
      //[Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>
    fs.appendFileSync(`./data/scraper-error.log`, `[${currentDate.toString()}] <${err.code}>`);

    return;
  }

  //Loop through all scraped data
  for(let i=0; i<obj.length; i++){

    let csvName = currentDate.getFullYear().toString() + "-" +
                 (currentDate.getMonth()+1).toString() + "-" +
                  currentDate.getDate().toString();

    // Assume that the the column headers in the CSV need to be in a certain
      //order to be correctly entered into a database. They should be in this order:
      //Title, Price, ImageURL, URL, and Time

    //Reset itemRow within looping logic
    let itemRow = {};

    // //Complete logic for the first pass so that the fieldNames are written
    // if(i === 0){
    //
    //   // var fields = ['car', 'price'];
    //   // let fieldNames = ['Car Name', 'Price USD'];
    //   let opts = {
    //     data: [],
    //     fields: ['Fields'],
    //     fieldNames: csvFields,
    //     quotes: ''
    //   };
    //   data.title = obj[i].Title;
    //   data.price = obj[i].Price;
    //   data.imageURL = obj[i].ImageURL;
    //   data.url = obj[i].URL;
    //   data.time = csvName;
    //   let csv = json2csv(opts);
    //
    //   console.log(csv);
    //
    //   // fields.push(csvFields);
    //   // });
    // }
    itemRow.title = obj[i].Title;
    itemRow.price = obj[i].Price;
    itemRow.imageURL = obj[i].ImageURL;
    itemRow.url = obj[i].URL;
    itemRow.time = csvName;

    //Building the complete list of appropriately ordered scraped data
    fields.push(itemRow);

    //Write all scraped data to appropriately named CSV file
    fs.writeFileSync(`./data/${csvName}.csv`, JSON.stringify(fields), function(err){
      if(err){
        console.log(`There was an error writing to the file ${csvName}.csv`);
      }
      return;
    }); //Code needs to append to line in file and use json2csv so CSVFields can be included
   }
})


// Assume that the the column headers in the CSV need to be in a certain order
  // to be correctly entered into a database.
  // They should be in this order: Title, Price, ImageURL, URL, and Time

// If your program is run twice
  // overwrite the data in the CSV file with the updated information.
    //Done. This happens by default

// If http://shirts4mike.com is down, an error message describing the issue
  //should appear in the console.
// The error should be human-friendly, such as “There’s been a 404 error.
  // Cannot connect to the to http://shirts4mike.com.”
//To test and make sure the error message displays as expected, you can disable the
  //wifi on your computer or device.


// Edit your package.json file so that your program runs when the 'npm start' command is run.
  // Done by writing script into package.json (change so that nodemon does not run app)


// When an error occurs, log it to a file named scraper-error.log .
  //It should append to the bottom of the file with a time stamp and error
    //May need to use a different write method for editing a single file
  //e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>

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

//Storing asychronous and unorganized data that doesn't match by index
let productPrice = [];
let pageTitle = [];
let productURL = [];
let imageURL = [];

let CSVData = [productPrice, pageTitle, productURL, imageURL];

// Get the price, title, url and image url from the product page
const x = Xray();
const productPageURL = "http://shirts4mike.com/shirts.php";

//WRITES OUTPUT TO JSON FILE AND THIS IS WHERE json2csv WOULD BE USED
// .write('results.json');


x(productPageURL, '.products a', //NEED <TITLE> INNER TEXT FROM PRODUCT PAGE
  [{
    href: '@href',
    imageURL: 'img@src'
  }]
)(function(err, obj){

  //On error
    //If needed, convert error to user friendly message
      //Display message to user (in console)
    //Send err to error log file with time stamp

  for(let i=0; i<obj.length; i++){
    console.log(obj[i].href + " " + obj[i].imageURL + " " + obj[i].productTitle);


    //  + "\n" + obj[i].price
    //prints http://shirts4mike.com/shirt.php?id=101,http://shirts4mike.com/shirt.php?id=102, etc.

    x(obj[i].href,'.price')(function(err, obj){ //This should scrape both price and title to keep matched data

      //On error
        //If needed, convert error to user friendly message
          //Display message to user (in console)
        //Send err to error log file with time stamp
      console.log(obj);
      productPrice.push(obj);
      console.log(productPrice);
    })

    x(obj[i].href,'title')(function(err, obj){


      console.log(obj + " title number " + (i+1));
      pageTitle.push(obj);
      console.log(pageTitle);
    })
  }
})

//Build arrays for each data type to be thrown into CSV



// x(productPageURL, {
//   price: x(),
//   title: '.title',
//   url: ,
//   imageURL: ,
// });



// Export product data to CSV file in dir './data' in a particular order (see below)
  //The information should be stored in an CSV file that is named for the date it was created
  //e.g. 2016-11-21.csv
    //Use built-in JS Date object and then parse the current date's year month
      //and day to create the file name

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


// Edit your package.json file so that your program runs when the npm start command is run.


// When an error occurs, log it to a file named scraper-error.log .
  //It should append to the bottom of the file with a time stamp and error
  //e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>

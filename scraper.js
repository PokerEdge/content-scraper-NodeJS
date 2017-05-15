//If you’re shooting for the "Exceeds Expectations" grade, it is recommended that you mention so in your submission notes.


//Create a scraper.js file that will contain your command line application.
  //Done by making the .js file

  //Choose and use two third-party npm packages that meet particular requirements.
    //One package should be used to scrape content from the site.
      //Chose X-ray to scrape content and as a module that has several downloads and recent updates

    //The other package should create the CSV file.
      //Chose json2csv to scrape content and as a module that has several downloads and recent updates

//Your project should also include a package.json file that includes your project’s dependencies.
  //Done by using npm init (dependencies properly saved to package.json with --save flag)

//The npm install command should install your dependencies.
  //Done by using the --save flag each time npm install <pkg> was used for the app

const Xray = require('x-ray');
const json2csv = require('json2csv');
const fs = require('fs');

//Check for director named 'data'. If directory does not exist, create directory.
const dir = './data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Get the price, title, url and image url from the product page
// Export product data to CSV file in dir './data' in a particular order (see below)
  //The information should be stored in an CSV file that is named for the date it was created
  //e.g. 2016-11-21.csv

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

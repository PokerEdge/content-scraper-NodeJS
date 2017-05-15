//Create a scraper.js file that will contain your command line application.
  //Done by making the .js file

//Your project should also include a package.json file that includes your project’s dependencies.
  //Done by using npm init (dependencies properly saved to package.json with --save flag)

//The npm install command should install your dependencies.
  //Done by using the --save flag each time npm install <pkg> was used for the app

const Xray = require('x-ray');
const json2csv = require('json2csv');
const fs = require('fs');

// Check for a folder called ‘data’. If the folder doesn’t exist, create one. If the folder does exist, the scraper should do nothing.
  //Done by using fs module and a string name for a dir(ectory) called 'data' to check for
    //the folder and to make the folder if it does not exist.
const dir = './data';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//Choose and use two third-party npm packages that meet particular requirements.
  //One package should be used to scrape content from the site.
    //Chose X-ray to scrape content and as a module that has several downloads and recent updates

  //The other package should create the CSV file.
    //Chose json2csv to scrape content and as a module that has several downloads and recent updates

## About this Application

This is a skeleton for integrating Tableau, Salesforce, and Angular. It was originally developed to display tableau dashboards within the Force.com platform. The AngularJS app handles communication between Salesforce and Tableau, allowing users to selectively save settings and load settings. This application uses the Tableau Javascript API to communicate with Tableau, and the Salesforce Javascript Remoting for communication with Salesforce. 

####The sequence is as follows: 

 * Salesforce Page Loads 
 * Creates Constants on page (view example visualforcepage for example, passes any dashboard metadata, as well as saved user preferences from Salesforce) 
 * Angular App Loads 
 * Tableau dashboard loads

The application takes in a few constant variables passed in from Salesforce to identify the user and page specific settings (related to the dashbaord the page is displaying). User preferences are stored in Salesforce as a JSON object by user. 

#### Future Improvements Ideas

This application could use a separate database to store user preferences and other settings if the application functionality expands beyond allowing users to select settings, rather than using Salesforce to persist data. 

## Getting Started

Download and install [node.js](https://nodejs.org/en/download/).

Make sure everything is working:   

`node -v` should return the version installed.
`npm -v` should return the npm version installed.

Install node dependencies:

`npm install -g bower` will install bower package manager.  
`npm install -g gulp` will install gulp task manager.  

Download packages needed:

`npm install && bower install` will download and install all bower and node dependencies used by the project.

Once packages are installed, use `gulp serve` to start the server for development. This will automatically monitor for changes in any application files and reload the files if changes occur.

This application was scaffolded using Yeoman and a Gulp Angular generator. 

## Building and Deployment

`gulp clean` will remove old files previously packaged. 

`gulp build` will optimize the files for deployment and create a `dist` directory where the optimized files will be created.

`gulp build --env {env}` can be used to build files for a specific deployment environment. `local` environment is default. Make sure a `local.json` file exists in the config directory.

In the case of uploading to Salesforce, compress the dist directory into a zip, and upload as a static resource to Salesforce. View the included VisualForce Page for an example of how to run the application. 

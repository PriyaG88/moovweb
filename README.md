# Moovweb Project

Welcome to your Moovweb project! Moovweb is a great way to build a compelling new front-end presentation for an existing website. The files in this project describe the changes you want to make to the front end of a site. There are places in this project to add new images (assets/images/), styles (assets/stylesheets/) and even manipulate HTML (scripts/).

## Before Running This

To run this project, you must have the Moovweb SDK installed on your system. Installation is easy - just go to [the download page on the Moovweb site](http://developer.moovweb.com/download) to download and install the latest version.

This assumes you have installed [npm](https://www.npmjs.com/), the node package manager, which is used to fetch libraries.

Install the default dependency packages specified in package.json:

    npm install

You can view files in the node\_modules directory to see the source code of all dependencies when you get curious.

## Getting Started

Once you have installed the local depenencies with `npm install`, you can start developing.

MoovJS runs JavaScript code in the Moovweb Cloud. Every time a user visits a MoovJS website:

1. The request is made by Moovweb.
2. The response is transformed by this project's code.
3. The result is served to the user.

Your project code effectively determines what happens in step 2. To transform sites with JavaScript, all you need is a ./scripts/index.js file containing the source of your project like so:

The body of the request you are trying to transform is always available to you as the global 'body' variable.

This is the simplest possible index.js file, which would stream the original HTML body to the user without making any changes:

````
module.exports = function() {
    return { body: body, htmlparsed: false };
};
````

In order to package the project code and deploy it to the cloud, all source code in the scripts directory is combined into a single file called moov_main.js. This file is autogenerated by a package called moov_builder which runs in the background when you start your moov server. See the 'Project Files' section below for more info about moov_main.js

## Transforming local traffic

### Moovweb Developer Dashboard and `moov start`

To easily develop multiple projects at a time, you can run the Moovweb Developer Dashboard, which will give you a graphical user interface (GUI) for the Moovweb SDK. You can start the Dashboard with the `moov start` command like so:

    sudo moov start

This will launch the local Moovweb Developer Dashboard interface in your favorite browser. By default, the Dashboard is viewable on your localhost via port 4002 (127.0.0.1:4002).

The Moovweb Developer Dashboard will let you generate, manage, start, debug, and track locally running projects as you develop.


### `moov server`

You can also run the Moovweb server directly for a particular project. Just change your working directory to the project folder in your terminal, then run the following command:

    sudo moov server

Then in a web browser, you can visit [mlocal.igadgetcommerce.com](http://mlocal.igadgetcommerce.com) and see the transformed web page in real time.


## Project Files

### ./scripts/index.js

This file is the entry point for your project. It will be the starting point for any transformations and can be modified to control the flow of execution when any request passes through your server.

### package.json

This file contains configuration settings, specifically the dependencies to use when running the project.

You can edit dependencies in package.json with the `npm update` command.

### moov_config.json

This file contains a series of fields to tell the moov server how this specific project has been configured.

The "hostmap" field will be used to map the domains you wish to transform.

The "taskrunner" field can be used to trigger specific scripts while using the SDK.

The "moovweb_project_format_version" field is a special key to tell the Moovweb Cloud what architecture your project should run in.


### ./scripts/moov_main.js

This file is the result of combining your project code into a single executable script.

While the server is running, ./scripts/moov_main.js will be generated based on your project code. As you save files in your project, it will be recomputed.

Note: you should not include ./scripts/moov_main.js to version control, due to its autogenerated nature and generally large size. By default, we add it to our .gitignore.


### node_modules

Node modules are shareable libraries that can be downloaded onto your machine. npm will use your package.json file to download specific versions of libraries, and those libraries can be included in your code using the require() function.

The dependencies moov_stdlib and moov_rewriter are REQUIRED by Moovweb.

Moovweb node modules are hosted on [npm.moovweb.net](https://npm.moovweb.net/).

### ./build/assets

This folder will be uploaded to the cloud. It is the production-ready assets directory. All processed css files, minified images, and javascript files to be linked to in `<script>` tags.

### ./assets

Asset files can be included in this directory while developing. This directory may contain many modifiable components used to transform a site, but the final assets that will be uploaded to the cloud are compiled and saved into the build/assets directory.

## Updating modules and npm shrink-wrap

Due to the nature of npm, it is possible to have dependencies which have their own dependencies.

Whenever you update a module, it is a good idea to run the npm shrinkwrap command in order to generate a recursive list of all versions of all subdependencies, so there are no discrepancies between two developers.

To update a node module:

1.  Modify the version of the dependency specified in your package.json file
2.  Run `npm install` to fetch the latest version and install it locally
3.  Run `npm shrinkwrap`
4.  Commit the changes to version control

After this, your teammates can checkout your changes and reinstall their submodules using the exact versions specified in npm-shrinkwrap.json.


## Domains

By default, the moov server manages host entries for you. This makes your local server transform traffic in real time based on your project code.

If running `sudo moov server` with the `-auto-hosts=false` option, remember to put all domains you're going to view in your /etc/hosts file like so:

    127.0.0.1   mlocal.igadgetcommerce.com


## Deploying Code

When you're ready to deploy your local project, you need to have a destination site on Moovweb.

The [Control Center](http://console.moovweb.com) is used to manage what code has been deployed over time, and which domains are transformed by which code.

### What gets deployed

Local versions of the following files and directories are compressed and uploaded to the cloud.

1. ./scripts/moov_main.js
2. ./build/assets
3. ./node_modules

It is important to note that your local node_modules and build/assets directories will be deployed to the cloud.

### `moov deploy`

To deploy to a specific project on the Moovweb Control Center, you must use the `moov deploy` command, and provide the acount and site information.

If you don't already have a project namespace to deploy to, log in to the [Control Center](http://console.moovweb.com) and create a project, giving it a unique name.

To deploy, use the `moov deploy` command:

    moov deploy $ACCOUNTNAME/$SITENAME

You can also specify a mode to deploy your code like so:

    moov deploy $ACCOUNTNAME/$SITENAME $MODENAME


## More Info

We have lots of informative guides, videos, live help, documentation, and even a book on how to use Moovweb. You should be able to get up and running in 30 minutes if you visit [developer.moovweb.com](http://developer.moovweb.com).

You might find [the page about the scripts folder](http://developer.moovweb.com/docs/local/project_files) useful for starting to write MoovJS code, and our [documents on the stylesheets folder](http://developer.moovweb.com/docs/local/project_files/stylesheet) for information on how we structure our stylesheets.
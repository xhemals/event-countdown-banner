# Getting Started

The following guide will help you get your environment setup to contribute to this plugin.

## Prerequisites

-   ### Node.js

    -   Event Countdown Banner is a WordPress plugin developed using React, a popular JavaScript library for building user interfaces. React allows us to create reusable UI components, manage component state, and handle user events, making it a great choice for this project.

    -   To set up the development environment and build the project, you'll need to have [Node.js](https://nodejs.org) installed on your system. Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a browser. It's used in this project to run the development server, build the project, and manage project dependencies.

-   ### WordPress

    -   This project is a WordPress plugin, which means you'll need a running instance of WordPress to use it. If you don't already have a WordPress setup, I recommend using [Local](https://localwp.com) by WPEngine. Local is a free, powerful local WordPress development application.

    -   Additionally, you'll need to have the WordPress REST API enabled, as the plugin uses it to fetch and update data. Most modern WordPress themes support the REST API out of the box, but if you're using an older theme, you might need to enable it manually.

    -   Finally, please ensure that your WordPress installation is up to date. We test the plugin with the latest versions of WordPress to ensure compatibility and recommend keeping your installation updated for the best experience.

-   ### The Events Calendar
    -   Currently this plugin is built to utilise the WordPress plugin called [The Events Calendar](https://wordpress.org/plugins/the-events-calendar/). Please install this plugin otherwise the plugin will refuse to activate
    -   You will also need to create an event for it to show in the plugin. To do this follow [these steps](docs/the-events-calendar/createEvent.md)

## Getting the code

Fork the repository, clone into your plugin directory `/path/to/your/wordpress/installation/wp-content/plugins/` and add the main repository as an upstream

```
$ git clone https://github.com/YOUR_GITHUB_USERNAME/event-countdown-banner.git
$ cd event-countdown-banner
$ git remote add upstream https://github.com/xhemals/event-countdown-banner.git
```

## Building the plugin

> Before you build please make sure you have all the prerequisites set up

Install the dependencies and start in development mode

```
npm install
npm run dev
```

> The install may take a minute or two to complete

Once built, activate the plugin in the plugin settings menu.

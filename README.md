# Vironas Bars & Taverns

With this app you can find some bars and taverns in Vironas, a neighborhood of Athens, Greece.

## How to run

Using <a href="https://tsiougr.github.io/Neighborhood-Map/">this live page</a> is recommended

#### Development build

navigate in the directory you want to place the app and:

* clone the current repository: `git clone https://tsiougr.github.io/Neighborhood-Map/`
* navigate in the project's repository `cd Neighborhood-Map`
* install all project dependencies with `npm install`
* start the hosting server with `npm start`

**Note that the service worker is only implemented during production build**.

## How to use

It should be pretty easy to get around. Pick a location by clicking on the map's markers or by selecting it from the list on the left. You can also filter the list of locations to your desired results with the dropdown menu. If you are on a phone or tablet the list probably won't be visible by default. Click on the burger icon on the top left to make it appear. Click the **view photos** button on the pop-up window and enjoy some beautiful images.

## Code dependencies

<ul>
<li> Even though the project was built from scratch, it utilizes **react.js** and all the packages that come with it when installing it from
<a href="https://github.com/facebook/create-react-app">facebook's create-react-app</a> package</li>
<li>The <a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google maps API</a></li>
<li>The <a href="https://www.npmjs.com/package/react-router">react-router</a> package</li>
</ul>
# transportation

![Screenshot](screenshot.png)

transportation is a library to display and manage public transport data. It is created to consume and produce [GTFS](https://developers.google.com/transit/gtfs/reference) data.


## Installation

Use NPM:

```shell
$ npm install transportation
```


## How to use it

You can easily explore the transportation library in the node.js REPL. It provides an own replacement for node's `console` by using [tconsole](https://www.npmjs.com/package/tconsole), so you can inspect the objects by using `require('transportation/console')`:

```
var Transit = require('transportation');
var konsole = require('transportation/console');
var transit = new Transit();

// Maybe import GTFS?
// transit.importGTFS(...);

// Display some data
konsole(transit.agencies);
konsole(transit.stops);
konsole(transit.services);
```

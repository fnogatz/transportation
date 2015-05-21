# transportation

Import [GTFS](https://developers.google.com/transit/gtfs/reference) data into a semantic model

![Screenshot](screenshot.png)

## Installation

```shell
$ npm install transportation
```

## Usage

```
var Transit = require('transportation')
var transit = new Transit()

// import GTFS data
transit.importGTFS('/path/to/gtfs/dir', function (err) {
  // have a look at the Transit instance
  console.log(transit)
})
```

transportation provides a replacement for node's `console` by using [tconsole](https://www.npmjs.com/package/tconsole), so you can inspect the objects in the node.js REPL by using `require('transportation/console')`:

```
> var konsole = require('transportation/console')
> konsole(transit)
┌────────────┬─────┐
│ Agencies   │ SWU │
├────────────┼─────┤
│ # Stops    │ 773 │
├────────────┼─────┤
│ # Services │ 14  │
├────────────┼─────┤
│ # Shapes   │ 65  │
└────────────┴─────┘
> konsole(transit.agencies.SWU.routes)
┌───────┬────────────┬───────────────────────────────────────────────┬─────────┐
│ ID    │ Short Name │ Long Name                                     │ # Trips │
├───────┼────────────┼───────────────────────────────────────────────┼─────────┤
│ 87001 │ 1          │ Söflingen–Böfingen                            │ 613     │
├───────┼────────────┼───────────────────────────────────────────────┼─────────┤
│ 87003 │ 3          │ Wiblingen (Alte Siedlung)–Wissenschaftsstadt  │ 649     │
├───────┼────────────┼───────────────────────────────────────────────┼─────────┤
│ 87004 │ 4          │ Grimmelfingen–Kuhberg–Böfingen Süd            │ 590     │
└───────┴────────────┴───────────────────────────────────────────────┴─────────┘
```

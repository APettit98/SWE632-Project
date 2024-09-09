# FlightBooker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Flights

Dummy flight data is defined in `/src/app/flightData.json` it can be imported into a `.ts` file using: `import * as flightData from './flightData.json'`. 
An individual flight is structured like this: 
```
{
    "date": // string: day of the week,
    "origin": // string: full city name of flight origin,
    "originCode": // string: airport code of flight origin,
    "destination": // string: full city name of flight destination,
    "destinationCode": // string: airport code of flight destination,
    "airline": // string: name of airline operating the flight,
    "departureTime": // string: flight departure time local to flight origin using a 24 hour clock,
    "arrivalTime": // string: flight arrival time local to flight destination using a 24 hour clock,
    "duration": // integer: duration of the flight in minutes,
    "economyPrice": // integer: price of an economy ticket for this flight segment,
    "businessPrice": // integer: price of an business class ticket for this flight segment,
    "firstPrice": // integer: price of an first class ticket for this flight segment,
}
```

Data was generated using ChatGPT with the following prompt:
Generate dummy flight data for use in a prototype web application. The data should be structured in JSON format. Inside the JSON object there should be the following fields: cities, airlines, flights. Cities must be a list of strings and should contain the names of the 25 largest cities in the US that have at least one airport that primarily serves that city. Airlines should also be a list of strings and should contain the following values: United, American, and Delta. 

The flights section should be a list of JSON objects that represent flights. Flights are defined like this: 
{
    "date": // string: day of the week,
    "origin": // string: full city name of flight origin,
    "originCode": // string: airport code of flight origin,
    "destination": // string: full city name of flight destination,
    "destinationCode": // string: airport code of flight destination,
    "airline": // string: name of airline operating the flight,
    "departureTime": // string: flight departure time local to flight origin using a 24 hour clock,
    "arrivalTime": // string: flight arrival time local to flight destination using a 24 hour clock,
    "duration": // integer: duration of the flight in minutes,
    "economyPrice": // integer: price of an economy ticket for this flight segment,
    "businessPrice": // integer: price of an business class ticket for this flight segment,
    "firstPrice": // integer: price of an first class ticket for this flight segment,
}

Generate a list of flights that mimics a typical weekly schedule given the constraints on cities and airlines. For instances where a city may have multiple major airports, select one of them and maintain consistency for all flights to and from that city. For example, flights to and from chicago could have the airport code MDW or ORD. Pick one of these airports and use it for all flights to and from that city. All prices must be in US Dollars. Departure and arrival times must be formatted as they would be on a 24 hour digital clock, so 1:00 would represent 1am and 13:00 would represent 1pm. 

The list of flights should attempt to mimic the same number of flights that would exist on these airlines between these cities in a normal week. This should in result in hundreds of flights. Each city should be used at least once. I want you to generate all the flights, it's ok if that takes a long time.

## Deployment

Our app is deployed via GitHub pages and is available at the url: https://apettit98.github.io/SWE632-Project/ . It gets redeployed automatically every time code is merged into the `main` branch.
Merging into `main` triggers a GitHub action which was created with help from [this website](https://angular.schule/blog/2020-01-everything-github). The action builds the app and deploys it using the [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) package. This package automatically updates the `gh-pages` branch, which GitHub then uses to host the site.

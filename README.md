# redux-service-demo
A React UI for testing Redux Service components without the need to integrate them into a large application

[![Build Status](https://travis-ci.org/danny-wieser/redux-service-demo.svg?branch=master)](https://travis-ci.org/danny-wieser/redux-service-demo)

See the demo here: https://danny-wieser.github.io/redux-service-demo/

Demo uses the fake todos api available here: http://jsonplaceholder.typicode.com/

## Overview

A Redux Data Service is a Redux wrapper for an API that maps API functionality to Redux Actions.

Each service will manage/populate a slice of state that can be combined to implement larger applications.

Striving to develop micro-components vs monolithic apps, you might create Redux Data Services that live alongside each micro-service API utilized in your application.

This demo application allows testing of each individual Redux Service in a simple UI that presents a list of services and actions for each. Configuration is used to specify data fields that need to be collected to each action, and then the action dispatch can be tested, either connected to a live API or using a mock api layer.

## Usage

Add as a project dependency

`yarn install redux-service-demo --dev`

Import the necessary functions (and CSS if desired)

```javascript
  import { configure, renderDemo } from 'redux-service-demo';`
  import 'redux-service-demo/styles/index.css';
```

Configure if you want to use redux logging and the application title

```javascript
  configure({
    useLogger: true,
    title: 'Redux Service Demo',
  });
```

Define your services object (see below) and pass it to the renderDemo function, along with the target container element for rendering

```javascript
renderDemo(services, document.getElementById('container'));
```
## Services Object

A Redux Data Service/State would typically consist of:
* a reducer
* an enumerated set of types available for the state
* a map of types to action function implementations

The services object expected by this application uses those properties, with the addition of another property representing an array of parameters expected by each action function (i.e. form fields in the application).

Actions will be triggered with a Redux dispatch, with all form fields being passed as individual parameters to the action function.

The services object itself is a map of individual services (keyname = servicename):

Example:

```
{
  serviceA: {
    reducer: ...
    types: ...
    actions: ...
    forms: [
      action1: ['field1A'],
      action2: ['field2A']
    ]
  },
  serviceB: {
    reducer: ...
    types: ...
    actions: ...
    forms: [
      actionA: ['fieldA1'],
      actionB: ['fieldB1']
    ]
  },  
}
```

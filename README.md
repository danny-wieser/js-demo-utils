# redux-service-demo
A React UI for testing Redux Service components without the need to integrate them into a large application

[![Build Status](https://travis-ci.org/danny-wieser/redux-service-demo.svg?branch=master)](https://travis-ci.org/danny-wieser/redux-service-demo)

## Overview

A Redux Data Service is a Redux wrapper for an API that maps API functionality to Redux Actions.

Each service will manage/populate a slice of state that can be combined to implement larger applications.

Striving to develop micro-components vs monolithic apps, you might create Redux Data Services that live alongside each micro-service API utilized in your application.

This demo application allows testing of each individual Redux Service in a simple UI that presents a list of services and actions for each. Configuration is used to specify data fields that need to be collected to each action, and then the action dispatch can be tested, either connected to a live API or using a mock api layer.

## Usage

`yarn install redux-service-demo`

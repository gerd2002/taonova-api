const express = require('express')
const mongodb = require('mongodb')
const assert = require('assert')
const fg = require('fast-glob')

const Route = require('./src/models/route')

const url = 'mongodb://localhost:27017'
const dbName = 'taonova'

let MongoClient = mongodb.MongoClient
mongodb.MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to database.")

  const db = client.db(dbName);
  const app = express()

  //import of routes
  const routes = fg.sync(['src/routes/**/*.js']);
  console.log("Loading routes: " + routes.join(' '))
  for (var i = routes.length - 1; i >= 0; i--) {
  	let path = routes[i]
  	let route = require('./' + path)
  	let routeObject = new route(app, db)
  	if (!routeObject) {
  		console.log("Failed to load " + path)
  	}
  }

  app.listen(3000, () => console.log('Taonova API listening on Port 3000!'))
})

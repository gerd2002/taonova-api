Route = require('../models/route')


class Template extends Route {

  constructor(app, db) {
    super(app, db)
    console.log("    Also registered " + this.versionedRoute())
  }

  route() {
    return '/template'
  }

  versionedRoute() {
    return '/template' + this.version()
  }

  version() {
    return 'v1'
  }

  GET(db) {
    return (req, res) => {
      res.end("Hello World.")
    }
  }

  POST(db) {
    return (req, res) => {
      res.end("Hello World.")
    }
  }

  PATCH(db) {
    return (req, res) => {
      res.end("Hello World.")
    }
  }

  DELETE(db) {
    return (req, res) => {
      res.status(200).end()
    }
  }

  register(app, db) {
    app.route(this.route())
      .get(this.GET(db))
      .post(this.POST(db))
      .patch(this.PATCH(db))
      .delete(this.DELETE(db))
  }
}

module.exports = Template
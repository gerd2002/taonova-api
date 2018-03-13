Route = require('../../models/route')


class Template extends Route {

  constructor(app, db) {
    super(app, db)
  }

  route() {
    return '/api/version'
  }

  version() {
    return 'v1'
  }

  GET(db) {
    return (req, res) => {
      res.end(version)
    }
  }

  register(app, db) {
    app.route(this.route())
      .get(this.GET(db))
  }
}

module.exports = Template
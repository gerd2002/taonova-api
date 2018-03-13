const ics = require('ics')

const Route = require('../../../../models/route')

class PublicCalendar extends Route {

  constructor(app, db) {
    super(app, db)
    console.log("    Also registered " + this.versionedRoute())
  }

  version() {
    return 'v1'
  }

  route() {
    return '/api/public/calendar/:userId.ics'
  }

  versionedRoute() {
    return '/api/' + this.version() + '/public/calendar/:userId.ics'
  }

  createCalendar(eventList) {
    let {error, value} = ics.createEvents(eventList)
    if (error) {
      throw error
    } else {
      return value
    }
  }

  GET(db) {
    return (req, res) => {
      db.collection('calendar').findOne({userId: req.params.userId}, function(err, result) {
        if (err !== null) {
          console.log(err)
          res.status(500).send("Internal Server Error")
        } else if (result === null || result.events === null) {
          res.status(404).send("File not found.")
        } else {
          ics.createEvents(result.events, (err, value) => {
            if(err !== null) {
              console.log(err)
              res.status(500).send("Internal Server Error")
            } else {
              res.send(value)
            }
          })
        }
      });
    }
  }

  register(app, db) {
    app.route(this.route())
      .get(this.GET(db))
    app.route(this.versionedRoute())
      .get(this.GET(db))
  }
}

module.exports = PublicCalendar
class Route {
	constructor(app, db) {
		this.register(app, db)
		console.log("Registered route " + this.route())
	}

	register(app, db) {
		console.log("Dummy, not registered.")
	}

	route() {
		return "none"
	}

	version() {
		return 'latest'
	}

	versionedRoute() {
    	return this.route() + '/' + this.version()
  	}
}

module.exports = Route

function search(req) {
	var year = req.query.year;
	var make = req.query.make;
	var model = req.query.model;

	options.qs.year = year;
	options.qs.make = make;
	options.qs.model = model;

	db.collection('cars').find(req.query).toArray((err, result) => {
		if (err) return console.log(err)
		if (result.length > 0) {
			res.render('index.html', {mpg: JSON.stringify(result, null, 4), year: year, make: make, model: model })
		}
		else {
			request(options)
				.then((models) => {

				if (models == null) {
					res.render('index.html', {year: year, make: make, model: model });
					return
				}

				if (Array.isArray(models.menuItem)) {
					models.menuItem = models.menuItem[0];
				}

				var id = models.menuItem.value;

				mpg_options.uri = mpg_url + id;

				console.log(mpg_options);

				request(mpg_options)
					.then((mpg) => {
						db.collection('cars').insertOne({
							year: year, 
							make: make, 
							model: model, 
							mpg: mpg
						}, function(err, r) {
	    					assert.equal(null, err);
							assert.equal(1, r.insertedCount);
							res.render('index.html', { models: JSON.stringify(models, null, 4), mpg: JSON.stringify(mpg, null, 4), year: year, make: make, model: model })
						});
				})
				.catch((err) => {
					console.log(err)
					res.send('error in request')
				})

			}).catch((err) => {
				console.log(err)
				res.send('error in request')
			})
		} // close else
	}) // close db.collection
}
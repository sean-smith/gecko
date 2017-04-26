var mongoose = require('mongoose')

// Uber Products (unique to each city)
// See https://developer.uber.com/docs/riders/references/api/v1.2/products-get
var products = mongoose.Schema({
      'upfront_fare_enabled': Boolean,
      'capacity': Number,
      'product_id': String,
      'image': String,
      'cash_enabled': Boolean,
      'shared': Boolean,
      'short_description': String,
      'display_name': String,
      'product_group': String,
      'description': String
})

module.exports = mongoose.model('Products', products)

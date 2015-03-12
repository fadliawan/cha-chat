var dbConfig = require('./db-config').config;
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

var Message = bookshelf.Model.extend({
  tableName: 'messages'
});

exports.Message = Message;
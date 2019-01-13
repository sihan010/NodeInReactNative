var rn_bridge = require('rn-bridge');
var crypto = require('crypto');
var _ = require('lodash');
var request = require('request');

rn_bridge.channel.on('message', (msg) => {
  const hash = crypto.createHmac('sha256', msg).update('I love cupcakes').digest('hex');
  rn_bridge.channel.send(msg+" : "+hash);   
});

rn_bridge.channel.on('pack', (data) => {
  var users = JSON.parse(data)
  var sorted = _.sortBy(users, ['user', 'age']);
  rn_bridge.channel.send(JSON.stringify(sorted))
});

rn_bridge.channel.on('api', (data) => {
  var endpoint = 'https://yts.am/api/v2/list_movies.jsonp?sort_by=rating'
  request.get(endpoint, (error, response, body) => {
    let json = JSON.parse(body);
    rn_bridge.channel.send(json.data.movies[0].title)
  })
});

console.log("Node is initialized")
var rn_bridge = require('rn-bridge');
var crypto = require('crypto');
var _ = require('lodash');
var request = require('request');

var torrentStream = require('torrent-stream');
var engine = torrentStream('magnet:?xt=urn:btih:A4A0BACBDA506D4A512126B82075263EE15D1FBD&dn=Smallfoot+%282018%29+%5B720p%5D+%5BYTS.AM%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337');

rn_bridge.channel.on('message', (msg) => {
  // const hash = crypto.createHmac('sha256', msg).update('I love cupcakes').digest('hex');
  // rn_bridge.channel.send(msg+" : "+hash); 
  engine.on('ready', function() {
    let name="";
    engine.files.forEach(function(file) {
      name = name + file.name + " --> ";
      //var stream = file.createReadStream();
    });
    rn_bridge.channel.send(name); 
  });
});

rn_bridge.channel.on('pack', (data) => {
  // var users = JSON.parse(data)
  // var sorted = _.sortBy(users, ['user', 'age']);
  // rn_bridge.channel.send(JSON.stringify(sorted))
  const http = require('http');

  const hostname = '127.0.0.10';
  const port = 6677;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.end('<h1>Hello from the Inside</h1>');
  });

  server.listen(port, hostname, () => {
    rn_bridge.channel.send(`Server running at http://${hostname}:${port}/`)
    //console.log(`Server running at http://${hostname}:${port}/`);
  });
});

rn_bridge.channel.on('api', (data) => {
  var endpoint = 'https://yts.am/api/v2/list_movies.jsonp?sort_by=rating'
  request.get(endpoint, (error, response, body) => {
    let json = JSON.parse(body);
    rn_bridge.channel.send(json.data.movies[0].title)
  })
});

console.log("Node is initialized")
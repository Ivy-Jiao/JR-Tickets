const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/'){
    res.end('<h1>About</h1>');

    return;
  } else {
    res.end('hello');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
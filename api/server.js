// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');

const server = jsonServer.create();

// Uncomment to allow write operations
const fs = require('fs');
const path = require('path');
const filePath = path.join('db.json');
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);
const router = jsonServer.router(db);

// Comment out to allow write operations
// const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  })
);
server.use(router);

const PORT = 3300;

server.listen(PORT, () => {
  console.log('JSON Server is running');
  console.log('=> http://localhost:' + PORT);
});

// Export the Server API
module.exports = server;

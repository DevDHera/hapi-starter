const Hapi = require('hapi');

// Store the hosting server and the port
const host = 'localhost';
const port = 8000;

// Create the Sever
const server = Hapi.Server({
  host,
  port
});

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
}

start();

const Hapi = require('hapi');

// Store the hosting server and the port
const host = 'localhost';
const port = 8000;

// Create the Sever
const server = Hapi.Server({
  host,
  port
});

// Add Home Route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello World :)';
  }
});

// Create a start method for the server
const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

// Call the start method
start();

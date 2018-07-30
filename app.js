const Hapi = require('hapi');
const mongoose = require('mongoose');
const keys = require('./configs/keys');
const Contact = require('./models/Contact');
// Connect to MongoDB instance
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(console.log('MongoDB Connected'))
  .catch(err => console.log(err));

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
    // return 'Hello World :)';
    return h.view('index', {
      name: 'Devin'
    });
  }
});

// Static Routes
server.route({
  method: 'GET',
  path: '/about',
  handler: (request, h) => {
    return h.file('./public/about.html');
  }
});

// GET Contacts Route
server.route({
  method: 'GET',
  path: '/contacts',
  handler: (request, h) => {
    return Contact.find()
      .exec()
      .then(contacts => {
        return h.view('contacts', {
          contacts
        });
      })
      .catch(err => {
        console.log(err);
      });
    /* return h.view('contacts', {
      contacts: [
        {
          name: 'Devin Herath',
          number: '071-1111111'
        },
        {
          name: 'Vimal Bandara',
          number: '071-1111112'
        },
        {
          name: 'Surendra Peiris',
          number: '071-1111113'
        }
      ]
    }); */
  }
});

// POST Contacts Route
server.route({
  method: 'POST',
  path: '/contacts',
  handler: (request, h) => {
    const contactData = {
      name: request.payload.name,
      number: request.payload.number
    };

    return Contact.create(contactData)
      .then(contact => {
        return h.redirect().location('contacts');
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// Create a start method for the server
const start = async () => {
  try {
    // Register Inert
    await server.register(require('inert'));
    // Register Vision and Configure Vision Templates
    await server.register(require('vision'));

    server.views({
      engines: {
        html: require('handlebars')
      },
      path: __dirname + '/views'
    });

    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

// Call the start method
start();

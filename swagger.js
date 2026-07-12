const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A simple API for managing contacts'
  },
  host: 'localhost:3001',
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Barefoot Nomad - Making company travel and accomodation easy and convinient.', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.'
    },
    servers: [
      {
        url: 'https://barefoot-stage.herokuapp.com//api/v1/'
      },
      {
        url: 'http://localhost:3300/api/v1/'
      }
    ],
    tags: [
      {
        name: 'Welcome',
        description: 'API for home page'
      },
      {
        name: 'Users',
        description: 'API for users in the app'
      },
      {
        name: 'Requests',
        description: 'API for Requests, every user can create a Requests in the app'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      },
    }
  },
  // Path to the API docs
  apis: ['src/routes/**/*.js'],
  // explorer: true,
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Solar Application Booking API',
      version: '1.0.0',
      description: 'API integration endpoints for the White-Label Solar App.',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
           type: 'http',
           scheme: 'bearer',
           bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // read the route files to pick up the JSDoc
};

const specs = swaggerJsDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

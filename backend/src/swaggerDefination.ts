import path from "path";

export const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Roofing Estimator',
      version: '1.0.0',
      description: 'Roofing estimator System covered Create, Read, Update, and Delete operations using a Node.js API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers:[
      {
        url:'http://localhost:5000/'
      },
    ],
  },
  apis: [path.resolve(__dirname, "./routes.ts"),],
};
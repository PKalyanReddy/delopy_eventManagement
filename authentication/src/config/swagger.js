const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Management API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // paths to files with documentation
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

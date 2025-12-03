const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = (app) => {
  // Define Swagger options
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ShopStream API",
        version: "1.0.0",
        description: "API documentation for ShopStream project",
      },
      servers: [
        {
          url: "http://localhost:3000", // local server
          description: "Local server",
        },
        {
          url: process.env.DEPLOY_URL || "https://yourapp.onrender.com",
          description: "Deployed server on Render",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        { bearerAuth: [] } // apply globally so Authorize button appears
      ],
    },
    apis: ["./routes/*.js"], // Path to route files with Swagger comments
  };

  const specs = swaggerJsDoc(options);

  // Serve Swagger UI
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

  console.log("Swagger docs available at /api/docs");
};

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec');

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
};

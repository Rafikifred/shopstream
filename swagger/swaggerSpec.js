const swaggerJSDoc = {
    openapi: '3.0.0',
    info: {
      title: 'ShopStream API (W05)',
      version: '1.0.0',
      description: 'ShopStream - Products & Users API (W05 Final Project Part 1)'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        UserCreate: {
          type: 'object',
          required: ['username','email','password'],
          properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string', enum: ['customer','admin'] },
            phone: { type: 'string' },
            address: { type: 'string' }
          }
        },
        Login: {
          type: 'object',
          required: ['email','password'],
          properties: { email: { type: 'string' }, password: { type: 'string' } }
        },
        Product: {
          type: 'object',
          required: ['name','price'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            sku: { type: 'string' },
            stock: { type: 'integer' },
            categories: { type: 'array', items: { type: 'string' } },
            images: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    security: [],
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register new user',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserCreate' } } } },
          responses: { 201: { description: 'User created' }, 400: { description: 'Validation or duplicate error' } }
        }
      },
      '/auth/login': {
        post: {
          summary: 'Login',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Login' } } } },
          responses: { 200: { description: 'Returns JWT token' }, 400: { description: 'Invalid credentials' } }
        }
      },
      '/products': {
        get: { summary: 'Get all products', responses: { 200: { description: 'List' } } },
        post: {
          summary: 'Create product (protected)',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          responses: { 201: { description: 'Created' }, 400: { description: 'Validation' } }
        }
      },
      '/products/{id}': {
        get: { summary: 'Get product', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } } },
        put: {
          summary: 'Update product (protected)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } }
        },
        delete: {
          summary: 'Delete product (protected)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } }
        }
      },
      '/users': {
        get: { summary: 'Get all users (protected)', security: [{ bearerAuth: [] }], responses: { 200: { description: 'List' } } },
        post: {
          summary: 'Create user (protected)',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserCreate' } } } },
          responses: { 201: { description: 'Created' } }
        }
      },
      '/users/{id}': {
        get: { summary: 'Get user', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], security: [{ bearerAuth: [] }], responses: { 200: { description: 'OK' } } },
        put: {
          summary: 'Update user (protected)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserCreate' } } } },
          responses: { 200: { description: 'Updated' } }
        },
        delete: {
          summary: 'Delete user (protected)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Deleted' } }
        }
      }
    }
  };
  
  module.exports = swaggerJSDoc;
  
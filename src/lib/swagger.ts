import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../config';

const publicGet = (summary: string) => ({ get: { summary, responses: { 200: { description: 'Successful response' } } } });
const bearer = [{ bearerAuth: [] }];
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Reusable Portfolio API', version: '2.0.0', description: 'Customizable single-owner portfolio API with protected administration.' },
    servers: [{ url: env.APP_URL }],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
      schemas: {
        Login: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', format: 'email' }, password: { type: 'string', format: 'password' } } },
        Error: { type: 'object', properties: { success: { type: 'boolean', example: false }, message: { type: 'string' } } },
      },
    },
    paths: {
      '/api/health': publicGet('Health check'),
      '/api/auth/login': { post: { summary: 'Admin login', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Login' } } } }, responses: { 200: { description: 'JWT and admin profile' }, 401: { description: 'Invalid credentials' } } } },
      '/api/auth/me': { get: { summary: 'Current admin', security: bearer, responses: { 200: { description: 'Admin profile' } } } },
      '/api/profile': { ...publicGet('Get public profile'), put: { summary: 'Create or update profile', security: bearer, responses: { 200: { description: 'Updated profile' } } } },
      '/api/settings': { ...publicGet('Get portfolio branding and settings'), put: { summary: 'Update settings', security: bearer, responses: { 200: { description: 'Updated settings' } } } },
      '/api/projects': { ...publicGet('Get published projects (supports featured, page, limit)'), post: { summary: 'Create project', security: bearer, responses: { 201: { description: 'Created project' } } } },
      '/api/skills': { ...publicGet('Get visible skills (supports category)'), post: { summary: 'Create skill', security: bearer, responses: { 201: { description: 'Created skill' } } } },
      '/api/history': { ...publicGet('Get visible work and education history (supports type)'), post: { summary: 'Create history entry', security: bearer, responses: { 201: { description: 'Created history entry' } } } },
      '/api/sections': { ...publicGet('Get visible custom sections'), post: { summary: 'Create custom section', security: bearer, responses: { 201: { description: 'Created section' } } } },
      '/api/uploads': { post: { summary: 'Upload an image or PDF', security: bearer, requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } } } }, responses: { 201: { description: 'Created media asset' } } } },
      '/api/contact': { post: { summary: 'Send a public contact message', responses: { 201: { description: 'Message sent' }, 429: { description: 'Rate limit exceeded' } } }, get: { summary: 'List contact messages (supports unread, page, limit)', security: bearer, responses: { 200: { description: 'Paginated inbox' } } } },
    },
  },
  apis: [],
};

export default swaggerJsdoc(options);

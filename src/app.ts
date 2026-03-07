import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './lib/swagger';
import profileRoutes from './routes/profileRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import historyRoutes from './routes/historyRoutes';
import contactRoutes from './routes/contactRoutes';

const app = express();

app.use(express.json());

// ─── Swagger Docs ──────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Portfolio API Docs',
    customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }',
}));
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/profile',  profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/history',  historyRoutes);
app.use('/api/contact',  contactRoutes);

export default app;


import express from 'express';
import profileRoutes from './routes/profileRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import historyRoutes from './routes/historyRoutes';
import contactRoutes from './routes/contactRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/profile',  profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/history',  historyRoutes);
app.use('/api/contact',  contactRoutes);

export default app;

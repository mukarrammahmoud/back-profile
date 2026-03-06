import express from 'express';
import profileRoutes from './routes/profileRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);

export default app;
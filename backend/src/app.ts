import express from 'express';

import userRoutes from './routes/userRoutes';
import housesRoutes from './routes/rentalsRoutes';

const app = express();
const router = express.Router();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/rentals', rentalsRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

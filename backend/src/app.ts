import express, { Router } from 'express';

import userRoutes from './routes/userRoutes.ts';
import rentalRoutes from './routes/rentalRoutes.ts';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/rentals', rentalRoutes);

app.listen(PORT, () => console.log('Server running on port 3000'));


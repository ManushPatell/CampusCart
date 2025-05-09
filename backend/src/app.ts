import express, { type NextFunction, type Request, type Response } from 'express';

import userRoutes from './routes/userRoutes.ts';
import rentalRoutes from './routes/rentalRoutes.ts';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/rentals', rentalRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('The server had an error!');
});

app.listen(PORT, () => console.log('Server running on port 3000'));

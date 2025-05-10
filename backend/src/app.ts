import express, { type NextFunction, type Request, type Response } from 'express';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.ts';
import rentalRoutes from './routes/rentalRoutes.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/rentals', rentalRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Thrown error: ${err.stack}`);
    res.status(500).json({ error: 'The server had an error!' });
    return;
});

app.listen(PORT, () => console.log('Server running on port 3000'));

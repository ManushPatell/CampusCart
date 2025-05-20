import express, { type NextFunction, type Request, type Response } from 'express';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.ts';

import userRoutes from './routes/userRoutes.ts';
import rentalRoutes from './routes/rentalRoutes.ts';

const app = express();
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/rentals', rentalRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Thrown error: ${err.stack}`);
    res.status(500).json({ error: 'The server had an error!' });
    return;
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server running for ${NODE_ENV} at http://localhost:${PORT}`);
    console.log('JsDoc running on http://localhost:3000/docs');
});

import dotenv from 'dotenv';
dotenv.config();

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.ts';

import userRoutes from './routes/userRoutes.ts';
import rentalRoutes from './routes/rentalRoutes.ts';
import authRoutes from './routes/authRoutes.ts';

const app = express();
const PORT = 3000;
const NODE_ENV = 'development';

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
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

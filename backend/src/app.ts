import dotenv from 'dotenv';
dotenv.config();

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.ts';

import userRoutes from './routes/userRoutes.ts';
import rentalRoutes from './routes/rentalRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(cors()); //  This allows ALL origins

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/rentals', rentalRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`Thrown error: ${err.stack}`);
  res.status(500).json({ error: err.message });
  if (NODE_ENV === 'development') {
    //return;
  }
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API — use /auth, /users, /rentals, or /docs');
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server running for ${NODE_ENV} at http://localhost:${PORT}`);
  console.log(`JsDoc running on http://localhost:${PORT}/docs`);
});

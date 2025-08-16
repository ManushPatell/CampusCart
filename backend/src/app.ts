import dotenv from "dotenv";
dotenv.config();

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.ts";

import userRoutes from "./routes/userRoutes.ts";
import rentalRoutes from "./routes/rentalRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import textbookRoutes from "./routes/textbookRoute.ts";
import miscRoutes from "./routes/miscRoutes.ts";
import uploadRoutes from "./routes/uploadRoutes.ts";

import cors from "cors";
import morgan from "morgan";
import { fromCamel } from "postgres";

const app = express();
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

app.disable("etag");

app.use(
  morgan("dev", {
    skip: () => NODE_ENV !== "development",
  }),
);
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
); // Since we rely on credential for cookies, we must set the origin.

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/rentals", rentalRoutes);
app.use("/misc", miscRoutes);
app.use("/textbooks", textbookRoutes);
app.use("/upload", uploadRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`Thrown error: ${err.stack}`);
  res.status(500).json({ error: err.message });
  if (NODE_ENV === "development") {
    //return;
  }
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to the API — use /auth, /users, /rentals, /docs or /textbooks",
  );
});

const img_host = ["'self'", "data:", "blob:", "http://localhost:3001", "https://*.amazonaws.com", "https://*.s3.amazonaws.com", "https://photo-storage-system.s3.ca-us-east-2.amazonaws.com"];


app.use((req, res, next) => {
  res.setHeader(
  "Content-Security-Policy",
  [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    `img-src ${img_host.join(" ")}`,
    `connect-src 'self': http://localhost:3001 ${FRONTEND_ORIGIN}`,
    "font-src 'self'",
  ].join("; ")
);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running for ${NODE_ENV} at http://localhost:${PORT}`);
  console.log(`JsDoc running on http://localhost:${PORT}/docs`);
});

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
import { swaggerSpec } from "./swagger";

import userRoutes from "./routes/userRoutes";
import rentalRoutes from "./routes/rentalRoutes";
import authRoutes from "./routes/authRoutes";
import textbookRoutes from "./routes/textbookRoute";
import miscRoutes from "./routes/miscRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import logRoutes from "./routes/logRoutes"

import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: "Too many attempts, please try again later.",
});

const app = express();
app.use(limiter);
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";
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
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/textbooks", textbookRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/logs", logRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`Thrown error: ${err.stack}`);
  res.status(500).json({ error: err.message });
  if (NODE_ENV === "development") {
    //return;
  }
});

if (NODE_ENV !== "production")
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api", (req: Request, res: Response) => {
  res.send(
    "Welcome to the API — use /api/auth, /api/users, /api/rentals, /api/docs or /api/textbooks",
  );
});

const BACKEND = `http://localhost:${PORT}`;

const imgSrc = [
  "'self'",
  "data:",
  "blob:",
  BACKEND,
  "https://*.amazonaws.com",
  "https://*.s3.amazonaws.com",
  "https://photo-storage-system.s3.ca-us-east-2.amazonaws.com",
];

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      `img-src ${imgSrc.join(" ")}`,
      `connect-src 'self' http://localhost:3001 ${FRONTEND_ORIGIN}`,
      "font-src 'self'",
    ].join("; "),
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server running for ${NODE_ENV} at http://localhost:${PORT}`);
  if (NODE_ENV !== "production")
    console.log(`JsDoc running on http://localhost:${PORT}/api/docs`);
});

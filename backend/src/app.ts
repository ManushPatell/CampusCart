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

import cors from "cors";
import morgan from "morgan";
import RateLimit from "express-rate-limit";

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});

const app = express();
app.use(limiter);
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";
const rawOrigins = process.env.FRONTEND_ORIGIN ?? "http://localhost:4321";
const FRONTEND_ORIGINS = rawOrigins
  .split(/[,\s]+/) // split on commas or whitespace
  .map((s) => s.trim())
  .filter(Boolean);

app.disable("etag");

app.use(
  morgan("dev", {
    skip: () => NODE_ENV !== "development",
  }),
);
app.use(
  cors({
    origin: FRONTEND_ORIGINS,
    credentials: true,
  }),
); // Since we rely on credential for cookies, we must set the origin.

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/textbooks", textbookRoutes);
app.use("/api/upload", uploadRoutes);

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

const connectSrc = [
  "'self'",
  BACKEND,
  ...FRONTEND_ORIGINS,
  ...FRONTEND_ORIGINS.map((o) =>
    o.replace(/^http:/, "ws:").replace(/^https:/, "wss:"),
  ), // HMR websockets
];

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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
      "style-src 'self' 'unsafe-inline'",
      `img-src ${imgSrc.join(" ")}`,
      `connect-src ${connectSrc.join(" ")}`,
      "font-src 'self' data:",
    ].join("; "),
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server running for ${NODE_ENV} at http://localhost:${PORT}`);
  if (NODE_ENV !== "production")
    console.log(`JsDoc running on http://localhost:${PORT}/api/docs`);
});

import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { authRoutes } from "./services/auth/routes/auth.routes";
import { errorHandler, notFoundHandler, requestLogger } from './middlewares';
import { sendSuccess } from './utils';
import { playerRoutes } from './services/player/routes/player.routes';
import { managerRoutes } from './services/manager/routes/manager.routes';

const app: Express = express();

// Trust proxy
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Health check
app.get("/health", (req, res) => {
  sendSuccess(res, "Health check successful", { service: "auth-service" });
});

const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:8081/auth",
  "exp://bpyc8dk-hasan111-8081.exp.direct/--/",
  "http://10.155.229.92:5000",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/player/", playerRoutes);
app.use("/api/manager/", managerRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

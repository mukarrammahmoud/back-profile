import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { clientOrigins, uploadDir } from "./config";
import swaggerSpec from "./lib/swagger";
import { errorHandler, notFound } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import historyRoutes from "./routes/historyRoutes";
import profileRoutes from "./routes/profileRoutes";
import projectRoutes from "./routes/projectRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import skillRoutes from "./routes/skillRoutes";
import uploadRoutes from "./routes/uploadRoutes";
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || clientOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Origin is not allowed by CORS."));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(uploadDir));
app.get("/api/health", (req, res) =>
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  }),
);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api/docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;

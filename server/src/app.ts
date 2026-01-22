import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import photoRoutes from "./routes/photoRoutes";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/photos", photoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Cloud Gallery API is running");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internl Server Error" });
});

export default app;

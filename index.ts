import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/routes";
import prisma from "./config/prisma";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

async function main() {
  await prisma.$connect();
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch(async (err) => {
  console.error("Failed to start server:", err);
  await prisma.$disconnect();
  process.exit(1);
});

export default app;

import { sequelize } from "./config/database";
import express, { Request, Response } from "express";
import router from "./routes";

const app = express();
app.use(express.json());
app.use("/api", router);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

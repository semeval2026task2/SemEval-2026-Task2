// index.js  (ES‑module style)
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path, { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import saveRouter from "./routes/save.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app  = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  console.log("→", req.method, req.path);
  next();
});
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

const docsRoot = join(__dirname, "docs");
app.use("/docs", express.static(docsRoot));

app.use("/api/save", saveRouter);
app.get("/api/health", (_, res) => res.send("ok"));

app.listen(PORT, () =>
  console.log(`API ready on http://localhost:${PORT}  (docs root → ${docsRoot})`)
);

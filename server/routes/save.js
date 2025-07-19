import { Router } from "express";
import fs from "node:fs/promises";
import path, { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot  = join(__dirname, "../docs"); 

console.log("Save route docsRoot →", docsRoot);

const router = Router();

router.post("/", async (req, res) => {
  const { filePath, markdown } = req.body || {};

  if (!filePath?.startsWith("/docs/") || typeof markdown !== "string") {
    return res.status(400).send("Malformed payload");
  }

  const absPath = path.join(docsRoot, filePath.replace(/^\/docs\//, ""));
  // absPath now: <repo>/docs/overview/overview.md

  try {
    await fs.mkdir(path.dirname(absPath), { recursive: true });
    await fs.writeFile(absPath, markdown, "utf8");
    console.log("✓ Saved", absPath);
    res.sendStatus(200);
  } catch (err) {
    console.error("✗ Cannot save:", err);
    res.status(500).send("Cannot save file");
  }
});

export default router;

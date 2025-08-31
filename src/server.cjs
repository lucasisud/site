import express from "express";
import fs from "fs";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 5000;
const dbPath = "./db.json";
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.get("/get-view", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json({ viewCount: data.viewCount });
});

app.get("/increment-view", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  data.viewCount++;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json({ viewCount: data.viewCount });
});

app.get("/reset-view", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  data.viewCount = 0;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json({ viewCount: data.viewCount });
});

app.get("/pfp", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json({ profilePic: data.profilePic });
});

app.post("/upload-pfp", upload.single("pfp"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  data.profilePic = "/uploads/" + req.file.filename;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  console.log("✅ New profile picture set:", data.profilePic);
  res.json({ profilePic: data.profilePic });
});

app.get("/cursor", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json({ cursor: data.cursor || "default" });
});

app.post("/set-cursor", (req, res) => {
  const { cursor } = req.body;
  if (!cursor) return res.status(400).json({ error: "No cursor provided" });

  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  data.cursor = cursor;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  console.log("✅ Cursor changed to:", cursor);
  res.json({ cursor });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

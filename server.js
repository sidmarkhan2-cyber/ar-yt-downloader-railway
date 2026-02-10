const express = require("express");
const ytdlp = require("yt-dlp-exec");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend working on Railway");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("URL required");

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="video.mp4"'
  );

  try {
    const stream = ytdlp(url, {
      format: "mp4",
      output: "-",
    });
    stream.pipe(res);
  } catch (e) {
    res.send("Download error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

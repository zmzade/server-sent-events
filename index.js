const colors = ["red", "green", "blue", "yellow", "purple", "pink"];

app.get("/currentTime", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const intervalId = setInterval(() => {
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
    res.write(`event: color\ndata: ${getRoundomColor()}\n\n`);
  }, 1000);

  res.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

const getRoundomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

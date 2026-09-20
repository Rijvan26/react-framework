import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 3000;

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const url = req.url === "/" ? "/index.html" : req.url;

  const filePath = path.join(process.cwd(), url!);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("Not Found");
    return;
  }

  const extension = path.extname(filePath);

  const contentType = mimeTypes[extension] ?? "application/octet-stream";

  const file = fs.readFileSync(filePath);

  res.writeHead(200, {
    "Content-Type": contentType,
  });

  res.end(file);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
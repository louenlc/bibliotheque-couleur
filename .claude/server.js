const http = require("http");
const fs = require("fs");
const path = require("path");

const root = "/Users/louen/Documents/bibliothèque couleur";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/nuancier_1.html";
  const full = path.join(root, p);
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    const ext = path.extname(full);
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(8743, "127.0.0.1", () => console.log("listening on 8743"));

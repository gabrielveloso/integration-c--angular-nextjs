const { createServer } = require("https");
const { readFileSync } = require("fs");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(
    {
      key: readFileSync("./certs/app.test-key.pem"),
      cert: readFileSync("./certs/app.test.pem"),
    },
    (req, res) => handle(req, res)
  ).listen(3000, "app.test", (err) => {
    if (err) throw err;
    console.log("> Ready on https://app.test:3000");
  });
});

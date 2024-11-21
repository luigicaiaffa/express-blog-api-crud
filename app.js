// # Configurazione
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

// # Rotte
const pagesRouter = require("./routers/pages");
const postsRouter = require("./routers/posts");

app.use("/", pagesRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`"Server del mio blog" listening on port ${port}`);
});

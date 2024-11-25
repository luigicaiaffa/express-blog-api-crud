// # Configurazione
const express = require("express");
const app = express();
const port = 3000;

// # Middlewares
const errorsHandler = require("./middlewares/errorsHandler");
app.use(express.static("public"));
app.use(express.json());

// # Rotte
const pagesRouter = require("./routers/pages");
const postsRouter = require("./routers/posts");

app.use("/", pagesRouter);
app.use("/posts", postsRouter);

// # Errors
app.use(errorsHandler);

// # Listening
app.listen(port, () => {
  console.log(`"Server del mio blog" listening on port ${port}`);
});

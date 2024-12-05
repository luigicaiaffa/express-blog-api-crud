// # Configurazione
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

// # Middlewares
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");
app.use(express.static("public"));
app.use(express.json());

// # Rotte
const pagesRouter = require("./routers/pages");
const postsRouter = require("./routers/posts");

app.use("/", pagesRouter);
app.use("/posts", postsRouter);
app.use(cors());

// # Errors
app.use(errorsHandler);
app.use(notFound);

// # Listening
app.listen(port, () => {
  console.log(`"Server del mio blog" listening on port ${port}`);
});

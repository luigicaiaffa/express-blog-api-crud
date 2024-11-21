// # Configurazione
const express = require("express");
const router = express.Router();

// # Array di post
const posts = require("../db/postslist.js");

// # Rotte
// index
router.get("/", (req, res) => {
  // res.json("Lista dei post");
  res.json(posts);
});

// show
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ error: "id not valid" });
    return;
  }

  const selectedPost = posts.find((post) => post.id === id);

  if (!selectedPost) {
    res.status(404).send({ error: "element not found" });
    return;
  }

  // res.json(`Post con id: ${id}`)
  res.json(selectedPost);
});

// create
router.post("/", (req, res) => {
  res.json("Crea un nuovo post");
});

// update
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Modifica interamente il post con id: ${id}`);
});

// modify
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Modifica parzialmente il post con id: ${id}`);
});

// delete
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ error: "id not valid" });
    return;
  }

  let indexOfPosts;
  posts.forEach((post, index) => {
    if (post.id === id) indexOfPosts = index;
  });

  const deletedPost = posts[indexOfPosts];

  if (indexOfPosts || indexOfPosts === 0) {
    posts.splice(indexOfPosts, 1);
  } else {
    res.status(404).send({ error: "element not found" });
    return;
  }

  // res.json(`Elimina il post con id: ${id}`);
  res.json({
    deletedPost,
    posts,
  });
});

module.exports = router;

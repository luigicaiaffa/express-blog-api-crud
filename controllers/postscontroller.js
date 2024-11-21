// # Configurazione
const express = require("express");
const posts = require("../data/postslist");

// # Rotte
// index
function index(req, res) {
  // res.json("Lista dei post");
  res.json(posts);
}

// show
function show(req, res) {
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
}

// create
function create(req, res) {
  res.json("Crea un nuovo post");
}

// update
function update(req, res) {
  const id = parseInt(req.params.id);
  res.json(`Modifica interamente il post con id: ${id}`);
}

// modify
function modify(req, res) {
  const id = parseInt(req.params.id);
  res.json(`Modifica parzialmente il post con id: ${id}`);
}

// destroy
function destroy(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ error: "id not valid" });
    return;
  }

  const selectedPost = posts.find((post) => post.id === id);

  const postIndex = posts.indexOf(selectedPost);

  if (!selectedPost) {
    res.status(404).send({ error: "element not found" });
    return;
  }

  posts.splice(postIndex, 1);

  // res.json(`Elimina il post con id: ${id}`);
  console.log(posts);
  res.sendStatus(204)
}

module.exports = { index, show, create, update, modify, destroy };

// # Configurazione
const express = require("express");
const posts = require("../data/postslist");

// # Rotte
// index
function index(req, res) {
  // valori in arrivo
  const { tag, title } = req.query;

  // copia dell'array posts
  let filteredPosts = [...posts];

  // controllo param tag
  if (tag) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(tag));
  }

  // controllo param title
  if (title) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // res.json("Lista dei post");
  res.json(filteredPosts);
}

// show
function show(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("Id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto
  const selectedPost = posts.find((post) => post.id === id);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // res.json(`Post con id: ${id}`)
  res.json(selectedPost);
}

// store
function create(req, res) {
  // id auto gen
  const id = posts.at(-1).id + 1;

  // dati in arrivo
  const { title, content, img, tags } = req.body;

  // errore
  if (
    !title ||
    !content ||
    !img ||
    !tags ||
    !Array.isArray(tags) ||
    !tags.length
  ) {
    const err = new Error("missing or invalid param");
    err.code = 400;
    throw err;
  }

  // log
  console.log(`// new data //`);
  console.log({ title, content, img, tags });

  // res.json("Crea un nuovo post");
  const newPost = { id, title, content, img, tags };
  posts.push(newPost);
  res.status(201).json(newPost);
}

// update
function update(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto
  const selectedPost = posts.find((post) => post.id === id);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // dati in arrivo
  const { title, content, img, tags } = req.body;

  // errore
  if (
    !title ||
    !content ||
    !img ||
    !tags ||
    !Array.isArray(tags) ||
    !tags.length
  ) {
    const err = new Error("missing or invalid param");
    err.code = 400;
    throw err;
  }

  // log
  console.log(`// modified data //`);
  console.log({ title, content, img, tags });

  // modified data
  selectedPost.title = title;
  selectedPost.content = content;
  selectedPost.img = img;
  selectedPost.tags = tags;

  // res.json(`Modifica interamente il post con id: ${id}`);
  res.json(selectedPost);
}

// modify
function modify(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto
  const selectedPost = posts.find((post) => post.id === id);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // dati in arrivo
  const { title, content, img, tags } = req.body;

  // modified title
  if (title) {
    selectedPost.title = title;
    console.log(`// modified data //`);
    console.log({ title });
  }

  // modified content
  else if (content) {
    selectedPost.content = content;
    console.log(`// modified data //`);
    console.log({ content });
  }

  // modified img
  else if (img) {
    selectedPost.img = img;
    console.log(`// modified data //`);
    console.log({ img });
  }

  // modified tags
  else if (tags && Array.isArray(tags)) {
    selectedPost.tags = tags;
    console.log(`// modified data //`);
    console.log({ tags });
  }

  // error
  else {
    const err = new Error("missing or invalid param");
    err.code = 400;
    throw err;
  }

  // res.json(`Modifica parzialmente il post con id: ${id}`);
  res.json(selectedPost);
}

// destroy
function destroy(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto e suo indice
  const selectedPost = posts.find((post) => post.id === id);
  const postIndex = posts.indexOf(selectedPost);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // res.json(`Elimina il post con id: ${id}`);
  posts.splice(postIndex, 1);
  console.log(`// deleted element id: ${id} //`);
  console.log(posts);
  res.sendStatus(204);
}

module.exports = { index, show, create, update, modify, destroy };

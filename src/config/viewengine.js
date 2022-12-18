
import express from 'express';

const configViewengine = (app) => {
  app.use(express.static('./src/public'));
  app.set("view engine", "ejs");
  app.set("views", "./src/view");
}

export default configViewengine;
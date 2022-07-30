// const express = require('express');
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
 import cors from 'cors';
 import {moviesRouter} from './routes/movies.js';

dotenv.config();
console.log(process.env.MONGO_URL);

const app = express();

const PORT = process.env.PORT || 4000;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

 
export const client = await createConnection();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});


app.use('/movies',moviesRouter)

app.listen(PORT, () => console.log(`App started in ${PORT}`));

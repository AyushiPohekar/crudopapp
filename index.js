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


// app.get("/mobiles", function (req, res) {
//   res.send(mobiles);
// });

// app.post("/mobiles",async function (request, response) {
//   const data=request.body;
//   //db.movies.insertMany
//   const result = await createMobiles(data)
//   .db("BATCH36db")
 
//   response.send(result);
//  });


// const mobiles=[
//   {
// model: "OnePlus 9 5G",
// img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
// company: "Oneplus"
// },
// {
// model: "Iphone 13 mini",
// img:
//   "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
// company: "Apple"
// },
// {
// model: "Samsung s21 ultra",
// img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
// company: "Samsung"
// },
// {
// model: "Xiomi mi 11",
// img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
// company: "Xiomi"
// }
// ];
app.use('/movies',moviesRouter)

app.listen(PORT, () => console.log(`App started in ${PORT}`));

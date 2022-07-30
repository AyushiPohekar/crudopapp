
import express from "express";
import {client} from "../index.js";
const router=express.Router();

router.get("/",async function (request, response) {
    //db.movies.find({})
    if(request.query.rating){
        request.query.rating=+ request.query.rating;
    }
    console.log(request.query);
    const movies = await client
    .db("BATCH36db")
    .collection("movies")
    .find(request.query)
    .toArray();
  response.send(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //   const movie = movies.find((mv) => mv.id === id);
  const movie = await client
    .db("BATCH36db")
    .collection("movies")
    .findOne({ id: id });
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "movie not found" });
});

router.delete("/:id", async function (request, response) {
    //db.movie.deleteOne({id:"101"})
    const { id } = request.params;
    console.log(request.params, id);
  
    const result = await client
      .db("BATCH36db")
      .collection("movies")
      .deleteOne({ id: id });
    result.deletedCount>0
      ? response.send({msg:"movie successfully deleted"})
      : response.status(404).send({ msg: "movie not found" });
  });

router.post("/",async function (request, response) {
   const data=request.body;
   //db.movies.insertMany
   const result = await client
   .db("BATCH36db")
   .collection("movies")
   .insertMany(data);
   response.send(result);
  });

  router.put("/:id", async function (request, response) {
    
    const { id } = request.params;
    console.log(request.params, id);
    const data=request.body;
    //db.movies.updateOne({id:"101"},{$set:data})
    const result = await client
      .db("BATCH36db")
      .collection("movies")
      .updateOne({id:id},{$set:data})
    result.modifiedCount>0
      ? response.send({msg:"movie successfully updated"})
      : response.status(404).send({ msg: "movie not found" });
  });

  export const moviesRouter=router;



import express from "express";
import {auth} from "../middleware/auth.js";
import { getAllmovies, getmovieById, deleteMovie, createmovie, updateMovieById } from "./helper.js";
const router=express.Router();

router.get("/",auth,async function (request, response) {
    //db.movies.find({})
    if(request.query.rating){
        request.query.rating=+ request.query.rating;
    }
    console.log(request.query);
    const movies = await getAllmovies(request);
  response.send(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //   const movie = movies.find((mv) => mv.id === id);
  const movie = await getmovieById(id);
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "movie not found" });
});

router.delete("/:id", async function (request, response) {
    //db.movie.deleteOne({id:"101"})
    const { id } = request.params;
    console.log(request.params, id);
  
    const result = await deleteMovie(id);
    result.deletedCount>0
      ? response.send({msg:"movie successfully deleted"})
      : response.status(404).send({ msg: "movie not found" });
  });

router.post("/",async function (request, response) {
   const data=request.body;
   //db.movies.insertMany
   const result = await createmovie(data);
   response.send(result);
  });

  router.put("/:id", async function (request, response) {
    
    const { id } = request.params;
    console.log(request.params, id);
    const data=request.body;
    //db.movies.updateOne({id:"101"},{$set:data})
    const result = await updateMovieById(id, data)
    result.modifiedCount>0
      ? response.send({msg:"movie successfully updated"})
      : response.status(404).send({ msg: "movie not found" });
  });

  export const moviesRouter=router;



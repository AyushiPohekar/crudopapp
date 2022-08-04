import { client } from "../index.js";

export async function updateMovieById(id, data) {
  return await client
    .db("BATCH36db")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteMovie(id) {
  return await client
    .db("BATCH36db")
    .collection("movies")
    .deleteOne({ id: id });
}
export async function createmovie(data) {
  return await client
    .db("BATCH36db")
    .collection("movies")
    .insertMany(data);
}
export async function getmovieById(id) {
  return await client
    .db("BATCH36db")
    .collection("movies")
    .findOne({ id: id });
}
export async function getAllmovies(request) {
  return await client
    .db("BATCH36db")
    .collection("movies")
    .find(request.query)
    .toArray();
}

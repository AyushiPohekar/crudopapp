
import express from "express";
import {  createUser,getUserByName } from "./helper.js";
const router=express.Router();
import bycrpt from "bcrypt";

async function genHashedPassword(password){
  const No_of_Rounds=10;
  const salt=await bycrpt.genSalt(No_of_Rounds);
  const hashedPassword=await bycrpt.hash(password,salt);
  return hashedPassword;
}




router.post("/signup",async function (request, response) {
   const {username,password}=request.body;
   
   const userFromDB=await getUserByName(username);

   console.log(userFromDB);
   if(userFromDB){
    response.status(400).send({msg:"user already exists"});
   }
   else if(password.length<8)
   {
    response.status(400).send({msg:"password must be longer"});
   }else{
     const hashedPassword=await genHashedPassword(password);
      console.log(hashedPassword);

    //db.movies.insertMany
  const result = await createUser({username:username,password:hashedPassword});
  response.send(result);

   }
 
   });

 

  export const usersRouter=router;



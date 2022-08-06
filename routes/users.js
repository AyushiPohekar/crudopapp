
import express from "express";
import {  createUser,getUserByName } from "./helper.js";
const router=express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function genHashedPassword(password){
  const No_of_Rounds=10;
  const salt=await bcrypt.genSalt(No_of_Rounds);
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

   router.post("/login",async function (request, response) {
    const {username,password}=request.body;
    
    const userFromDB=await getUserByName(username);
 
    console.log(!userFromDB);
    if(!userFromDB){
     response.status(401).send({msg:"invalid credentials"});
    }
    else{
      const storePassword=userFromDB.password;
      const isPasswordMatch=await bcrypt.compare(password,storePassword);
      console.log(isPasswordMatch);
    
      if(isPasswordMatch)
      {
        const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);
        response.send({msg:"Successful login",token:token});
      }
      else
      {
        response.status(401).send({msg:"Invalid Credentials"});
      }
    }
   
  
    });

 

  export const usersRouter=router;



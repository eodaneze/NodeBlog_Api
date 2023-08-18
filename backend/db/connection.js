const express = require('express');
const { mongoose } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URL

try{
    mongoose.connect(url)
    console.log("Database was connected successfully");
}catch(err){
    console.log({err:message});
}
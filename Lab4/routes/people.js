const express = require("express");
const router  = express.Router();
const data = require("../data")
//bluebird and redis connection related code to promisify all the methods first to use getasync functions
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


router.get("/history", async(req,res)=>{
    let result=[]
    let history = await client.lrangeAsync("history",0,20);
    res.status(200).json({history}).send();
})

router.get("/:id",async(req,res)=>{
    try{
        let output = await data(req.params.id);
        // console.log("Output",output);
        res.status(200).json({output});
    }catch(e){
        res.status(404).json({error:e.message})
    }
})

module.exports=router;
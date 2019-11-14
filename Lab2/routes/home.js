const express = require("express")
const router  = express.Router()
router.get("/",async (req,res)=>{
    try{
        res.render("partials/home",{title:"Wierd Things"});
    }catch(e){
        res.send(404).json({error:"Something went wrong with your request"})
    }
})
module.exports = router
const data = require("./people");
const constructorMethod = app =>{
    app.use("/api/people",data);
    app.use("*",(req,res)=>{
        res.status(404).json({error:"URL Not found"});
    });
}
module.exports = constructorMethod;
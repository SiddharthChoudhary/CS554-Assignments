const home = require("./home")
const constructorMethod = app =>{
    app.use("/",home)
    app.use("*",(req,res)=>{
        res.render("partials/notfound",{title:"Not Found"});
    })
}
module.exports = constructorMethod;
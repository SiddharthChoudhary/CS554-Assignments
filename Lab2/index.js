const express = require('express')
var exphbs = require('express-handlebars')
const app = express()
const static = express.static(__dirname + "/public");
app.engine('handlebars',exphbs())
app.set('view engine','handlebars')

app.use(express.static('public'))
app.use("/public", static);
const configRoutes = require('./routes');
configRoutes(app)
app.listen(5000,()=>{
    console.log("The server is healthy and running");
})

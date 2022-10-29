const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8500;

//Public Static Path
const staticPath = path.join(__dirname,"../public")
app.use(express.static(staticPath));

//Set the handlebars
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);

//Routing
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/weather",(req,res)=>{
    res.render("weather");
})

app.get("*",(req,res)=>{
    res.render("404error",{
        errorMsg: "Opps! Page doesn't Exist"
    });
})

app.listen(port,()=>{
    console.log(`Listening to ${port}`);
})
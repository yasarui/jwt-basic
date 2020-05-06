const express = require("express");
const jwt = require("jsonwebtoken");

//Init app
const app = express();

const port = process.env.port || 3000

app.get("/api",(req,res)=>{
    res.send("App is working fine");
});

app.post("/api/post",verifyToken,(req,res)=>{
    jwt.verify(req.token,"dreamcatcher",(err,authData)=>{
         if(err){
             res.sendStatus(403)
         }else{
             res.status(200).send({
                 message:"Post Created Successfully",
                 authData
             })
         }
    })
    res.json({
        message:"Post Created Successfully"
    })
});

app.post("/login",(req,res)=>{
    //mock user
    const user = {
        id: 1,
        name: "Yasar Arafat",
        email: "yasararafat88@gmail.com"
    }

    jwt.sign({user},"dreamcatcher",(err,token)=>{
        if(err){
            res.sendStatus(500)
        }else{
            res.json({token})
        }
    })
});

app.listen(port,()=>{
    console.log(`Server is up and Running on port ${port}`)
})

function verifyToken(req,res,next){
    console.log("headers ",req.headers);
    const token = req.headers["authorization"];
    if(typeof token !== 'undefined'){
        const tokenArr = token.split(" ");
        const bearerToken = tokenArr[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
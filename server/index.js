const express = require('express')
const app = express()
const port = 4000

app.get('/numbers', (req, res)=>{
    console.log(req.query);
})


app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
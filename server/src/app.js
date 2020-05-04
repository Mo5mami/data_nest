const express = require('express')
require('./db/mongoose')
const app = express()
const userRouter = require('./routers/users')
const adminRouter = require('./routers/admin')
const datasetsRouter = require('./routers/datasets')
const port = process.env.PORT || 5000
const Contribution = require('./models/contribution')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    
    next();
    });


var bodyParser  = require('body-parser');
//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));
//static folder
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json())
app.use(express.json())
app.use(userRouter)
app.use(adminRouter)
app.use(datasetsRouter)

 app.listen(port,()=>{
     console.log('listening on port '+port)
 })

 
 

const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
const cors = require("cors");
const postRouter = require('./routes/postRouter');
const userRouter = require("./routes/userRoutes");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config");

const redisClient = redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT
});
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectWithRetry = () =>{
    mongoose.connect(mongoURL)
    .then(()=>{
        console.log("successfull connected");
    })
    .catch(err => {
        console.log(err);
        setTimeout(connectWithRetry,5000);
    });
}
connectWithRetry();

app.enable("trust proxy");
app.use(cors());
app.use(session({
    store: new RedisStore({ client : redisClient }),
    secret: SESSION_SECRET,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:300
    }
}))

app.use(express.json());
const port = process.env.PORT || 4000;
app.get('/api/v1',(req,res)=>{
    res.send('<h1>dev fucked!!!!!!!</h1> ');
    console.log("yeah it ran")
})
app.use('/api/v1/post',postRouter);
app.use('/api/v1/users',userRouter)
app.listen(port,()=>{
    console.log("server is running on",port);
})
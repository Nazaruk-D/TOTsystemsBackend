const express = require('express')
const authRouter = require('./src/routers/authRouter')
const searchRouter = require('./src/routers/searchRouter')
const messageRouter = require('./src/routers/messageRouter')
const userRouter = require('./src/routers/userRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

const PORT = process.env.PORT || 7542;
const app = express()
dotenv.config();

const corsOptions = {
    origin: (origin: string, callback: Function) => {
        console.log("origin: ", origin);
        callback(null, true);
    },
    credentials: true,
    optionSuccessStatus: 200
}
const jsonBodyMiddleWare = express.json()

app.use(jsonBodyMiddleWare)
app.use(cors(corsOptions));
app.use(cookieParser('secret key'))
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`I started listening port: ${PORT}`)
})
import express from 'express'
import mongoose from 'mongoose'
// import path from 'path'
// import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Promise from 'bluebird'

import { auth, user, todo } from './routes'

dotenv.config()
const app = express()
app.use(bodyParser.json())

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/todo', todo)

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

export default app
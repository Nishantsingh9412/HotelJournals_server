import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import tipsAdminRoutes from './routes/Tips.js'
import coursesRoutes from './routes/Courses.js' 
import jobsRoutes from './routes/Jobs.js'
import userProfileRoutes from './routes/userProfile.js'
import recruiterProfileRoutes from './routes/recruiterProfile.js'
import superadminRoutes from './routes/superadminRoutes.js'
import { mailFunction } from "./controllers/mail.js";




const app = express()
dotenv.config()
const port = 5000



app.use(express.json({limit:'30mb',extended:true}));
app.use(express.urlencoded({limit:'30mb',extended:'true'}))
app.use(cors())
// For image upload
app.use('/uploads',express.static('uploads'))


app.use('/user',userRoutes)
app.use('/admin',tipsAdminRoutes)
app.use('/courses',coursesRoutes)
app.use('/jobs',jobsRoutes)
app.use('/user/profile',userProfileRoutes)
app.use('/recruiter/profile',recruiterProfileRoutes)
app.use('/superadmin',superadminRoutes)
app.post('/mail',mailFunction)

app.get('/', (req, res) => {
  res.send(' This is Hotel Journals ')
})

const PORT = 5000
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL , {useNewUrlParser:true,useUnifiedTopology:true})
.then(
    () => app.listen(PORT, 
        () => {console.log(`server running on PORT ${PORT}`)})
).catch(
    (err) => console.log(err)
);



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
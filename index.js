const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/Users');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api",UserRoutes);

app.get("/", async (req,res)=>{
  res.send({message:"hello world"});
})

mongoose.connect(process.env['DB_URL'])
  .then(() => console.log("DB connected succesfully"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})


const express = require('express');
const cors = require('cors')
const v1Router = require('./routes/v1.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1', v1Router);

app.listen(3000, ()=>{
  console.log("server listening on port 3000");
});
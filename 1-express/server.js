const express = require("express");

const app = express();

// Middleware
const m1 = (req, res, next) => {
  console.log("m1");
  next();
}

const m2 = (req, res, next) => {
  console.log("m2");
  next();
}

const m3 = (req, res, next) => {
  console.log("m3");
  next();
}

const m4 = (req, res, next) => {
  console.log("m4");
  next();
}

//chunk: get data and handle json formate data
app.use(express.json());
app.use(m2);
app.use(m1);


//app.{method}(pathname, route handler)
// app.get('/', (req, res) => {
//   res.send('hello from express');
// });

app.get('/movies/:id/:name', m3, (req, res) => {
  const {title, rating} = req.query;

  res.send({
    params: req.params,
    query: {
      title,
      rating,
    },
    number: 123,
  });

});

//middleware
app.get('/middleware', m4, (req, res)=>{
  res.json({
    okey: true,
  });
});

app.post('/movies', (req, res) => {
  // res.send({body: req.body});
  res.status(201).json({body: req.body});
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

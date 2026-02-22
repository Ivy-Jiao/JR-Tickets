const express = require("express");

const app = express();

// Middleware
app.use(express.json());

//app.{method}(pathname, route handler)
// app.get('/', (req, res) => {
//   res.send('hello from express');
// });

app.get('/movies/:id/:name', (req, res) => {
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

app.post('/movies', (req, res) => {
  // res.send({body: req.body});
  res.status(201).json({body: req.body});
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
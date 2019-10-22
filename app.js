const express = require("express");
const app = express();

app.use(express.static("public"));

app.get('/',(req,res) =>{
  res.render('poker.ejs');
});

const hostname = process.env.IP;// || '127.0.0.1';
const port = process.env.PORT;// || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get('/',(req,res) =>{
  res.render('poker.ejs');
});


// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("Server je pokrenut!"); 
// });

const hostname = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3000;

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
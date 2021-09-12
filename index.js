const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const priority = req.body.priority;
  const status = req.body.status;
  const color = req.body.color;
  const numaric = req.body.numaric;

  db.query(
    "INSERT INTO employees (name, priority, status, color, numaric) VALUES (?,?,?,?,?)",
    [name, priority, status, color, numaric],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const numaric = req.body.numaric;
  db.query(
    "UPDATE employees SET numaric = ? WHERE id = ?",
    [numaric, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/register", (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  

  db.query(
    "INSERT INTO register (email, password) VALUES (?,?)",
    [email,password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Email Regisered");
      }
    }
  );
});



app.post ("/login" , function (request, response ){
  
  var email= request.body.email;
  var password = request.body.password;
  

  db.query ("INSERT INTO login  ( email, password) value (?,?)",[ email, password],function(error , result,field){
    if(!error) {
      response.json({
       message:"data Submit"
        });
    } else {
      if     (error.code=='ER_DUP_ENTRY'){
        response.status(201).json({message:'email is alredy register'})
      }
      else{response.json({message:error})}
    }
  });
})



app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

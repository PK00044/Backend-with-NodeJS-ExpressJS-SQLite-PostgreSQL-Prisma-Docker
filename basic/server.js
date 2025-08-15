const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let data = ["Initial data"];

// Components sending endpoints
app.get("/", (req, res) => {
    // console.log(req);
  res.send(`
    <body>
    <h1>Data</h1> <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Go to Dashboard</a>
    </body>
    `);
});

app.get("/dashboard", (req, res) => {
  res.send(`
    <body>
    <h1>Dashboard</h1>
    <a href="/">HOME</a>
    <p>Welcome to the dashboard!</p>
    <input />
    </body>
    `);
});











// API endpoints
app.get("/api/data", (req, res) => {
  res.send("Hello from the API!");
});

app.post("/api/data", (req, res) => {
  //fetches the post info
  let response = req.body;
  data.push(response.name);
  res.send("Data received: " + JSON.stringify(response.name));
});


app.delete('/api/data', (req,res) =>{
    data.pop();
    res.send("Last item deleted");
})




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

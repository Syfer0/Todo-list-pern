const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() for parsing JSON

// Routes
 
//create a todo 
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]); // Send the inserted todo back as JSON
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

//get all todo
app.get("/todos",async(req,res) =>{
  try {
    const allTodos = await pool.query("SELECT * FROM todo")

    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message)
  }
})
// Select a todo by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo where todo_id = $1", [id]);

    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Update a todo by ID
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    if (updatedTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo was updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );

    if (deletedTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo is deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});






// get Api
// app.get("/", (request, response) => {
//   response.json({
//     info: "Node.js, Express, and Postgres API",
//   });
// });

// app.get("/users", db.getUsers);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);
// app.patch("/users/:id", db.updateStatusUser);

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`);
// });

// exception handling
// http codes
// sql queries
// better architechture
// clean code & code quality optimization

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM public.task ORDER BY id DESC", (error, results) => {
    if (error) {
      throw error; 
    }
    response.status(200).json(results.rows);
  });
};
const createUser = (request, response) => {
  const { id, title, description, status } = request.body;
  console.log(request.body)
  pool.query(
    "INSERT INTO task (id, title, description, date , status) VALUES ($1, $2, $3, $4, $5)",
    [id, title, description, new Date(), status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${JSON.stringify(results)}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, description, status } = request.body;
  pool.query(
    "UPDATE task SET title = $1, description = $2 ,status = $3 WHERE id = $4",
    [title, description, status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};
const updateStatusUser = (request, response) => {
  const id = parseInt(request.params.id);
  const {  status } = request.body;
  pool.query(
    "UPDATE task SET status = $1 WHERE id = $2",
    [status, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM task WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateStatusUser,
};
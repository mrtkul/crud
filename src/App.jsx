import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030";

function App() {
  const [todos, setTodos] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState();

  useEffect(() => {
    // fetch("http://localhost:3030/todos")
    //   .then((res) => res.json())
    //   .then((data) => setTodos(data));
    axios
      .get("/todos", {
        timeout: 5000,
        timeoutErrorMessage: "zaman aşımı",
        params: {
          _per_page: 10,
          _page: page,
        },
      })
      .then((res) => {
        setMaxPageCount(res.data.pages);
        setTodos(res.data.data);
      })

      .catch((err) => {
        console.log(err);
        if (err.message === "zaman aşımı") {
          alert("istek zaman aşımı");
        }
      });
  }, [page]);
  return (
    <div className="container w-75 p-3 p-md-5">
      <h2 className="text-center">
        Server <span className="text-warning">CRUD</span>
      </h2>

      <Form setTodos={setTodos} />
      <ul className="list-group">
        {!todos && <Loader />}

        {todos?.map((todo) => (
          <ListItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>
      <div className="d-flex justify-content-between my-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary"
        >
          {"<Geri"}
        </button>
        <span>{page}</span>
        <button
          disabled={page === maxPageCount}
          button
          onClick={() => setPage(page + 1)}
          className="btn btn-primary"
        >
          {">İleri"}
        </button>
      </div>
    </div>
  );
}

export default App;

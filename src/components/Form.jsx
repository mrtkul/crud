import { v4 } from "uuid";
import axios from "axios";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const status = e.target[1].value;
    if (!title) {
      return alert("lütfen başlık yazınız");
    }

    const newTodo = {
      title: title,
      status: status,
      id: v4(),
      date: new Date().toLocaleDateString(),
    };
    // *fetch isteği örneği*
    // fetch("http://localhost:3030/todos", {
    //   method: "POST",
    //   body: JSON.stringify(newTodo),
    // })
    //   .then(() => setTodos((todos) => [newTodo, ...todos]))
    //   .catch(() => alert("üzgünüz bir sorun oluştu"));

    axios
      .post("/todos", newTodo)
      .then(() => setTodos((todos) => [newTodo, ...todos]))
      .catch(() => alert("üzgünüz bir sorun oluştu"));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        placeholder="ör:react projesi yap.."
        className="form-control shadow"
        type="text"
      />
      <select className="form-select w-50 shadow">
        <option>Varsayılan</option>
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
      </select>
      <button type="submit" className="btn btn-primary shadow">
        Gönder
      </button>
    </form>
  );
};

export default Form;

import axios from "axios";
import formatDate from "../helpers/formatDate";
import getStatus from "../helpers/getStatus";
import { useState } from "react";
import Content from "./Content";
import EditMode from "./EditMode";

const ListItem = ({ todo, setTodos }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();

    const newStatus = e.target[0].value;
    const newTitle = e.target[1].value;

    axios
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus,
      })

      .then(() => {
        const updated = { ...todo, status: newStatus, title: newTitle };

        // eğer ki eleman güncellenecekse
        const newTodos = todos.map((todo) =>
          todo.id === updated.id ? updated : todo
        );
        setTodos(newTodos);
      });

    // düzenlme modunu kapat
    setIsEditMode(false);
  };

  const handleDelete = () => {
    axios
      .delete(`/todos/${todo.id}`)

      // veriyi stateden sil
      .then(() =>
        setTodos((todos) => todos.filter((item) => item.id !== todo.id))
      );
  };
  return (
    <li className="relative p-3 list-group-item d-flex justify-content-between align-items-center gap-1">
      {!isEditMode ? (
        <Content
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleDelete={handleDelete}
        />
      ) : (
        <EditMode
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleEdit={handleEdit}
        />
      )}

      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;

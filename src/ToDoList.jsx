import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
    let [todos, setTodos] = useState([
        { task: "Sample-task", id: uuidv4(), done: false }
    ]);
    let [newTodo, setNewTodo] = useState("");
    let [selectedTodo, setSelectedTodo] = useState(null);

    let addNewTask = () => {
        if (selectedTodo) {
            // Update existing task
            setTodos(
                todos.map((todo) =>
                    todo.id === selectedTodo.id
                        ? { ...todo, task: newTodo }
                        : todo
                )
            );
            setSelectedTodo(null);
        } else {
            // Add new task
            setTodos([...todos, { task: newTodo, id: uuidv4(), done: false }]);
        }

        setNewTodo("");
    }

    let updateTaskValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTask = (taskId) => {
        setTodos(todos.filter((todo) => todo.id !== taskId));
    }

    let editTask = (task) => {
        setNewTodo(task.task);
        setSelectedTodo(task);
    }

    let markAsDone = (taskId) => {
        setTodos(
            todos.map((todo) =>
                todo.id === taskId ? { ...todo, done: !todo.done } : todo
            )
        );
    }

    return (
        <div>
            <input
                placeholder="add a task"
                value={newTodo}
                onChange={updateTaskValue}
            ></input>
            <br />
            <br />
            <button onClick={addNewTask}>
                {selectedTodo ? "Update Task" : "Add Task"}
            </button>
            <br />
            <br />
            <br />
            <hr />
            <h4>Tasks Todo</h4>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.done ? "line-through" : "none"
                            }}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => editTask(todo)}>Edit</button>
                        <button onClick={() => deleteTask(todo.id)}>Delete</button>
                        <button onClick={() => markAsDone(todo.id)}>
                            {todo.done ? "Undo" : "Done"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

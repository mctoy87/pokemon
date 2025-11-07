import React, {useState} from 'react';
import { useTodoStore } from '../store/todoStore';
import './TodoList.css';


export const TodoList:React.FC = () => {
  // Локальное состояние для поля ввода
  const [input, setInput] = useState('');

  //Достать из store: todos, addTodo, removeTodo
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  // Функция для добавления задачи
  const handleAddTodo = () => {
    if (input.trim()) {       // проверяем что строка ввода не пустая
      addTodo(input);
      setInput('');           // очищаем поле ввода
    }
  };

  return (
    <div className="todo_wrapper">
      {/* Поле ввода */}
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
        placeholder='Введите задачу'
      />

      <button onClick={handleAddTodo}>Добавить</button>

      {/* Список задач */}
      <ul>
        {todos.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>
            Нет задач. Добавьте первую!
          </p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => removeTodo(todo.id)}>Удалить</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

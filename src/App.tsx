import React from 'react';
import { Counter } from './components/Counter';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>🎯 Моё первое приложение с Zustand</h1>
            <div style={{ marginBottom: '40px' }}>
                <Counter />
            </div>
            <div>
                <TodoList />
            </div>
        </div>
    );
}

export default App;
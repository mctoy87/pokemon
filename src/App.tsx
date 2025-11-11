import React from 'react';
import './App.css';
import { Card } from './components/Card';
import type { Card as CardType } from './types/Card';
import { CardForm } from './components/CardForm';
import { CardList } from './components/Card.List';

const testCard: CardType = {
    id: 1,
    title: "Тестовая карточка",
    description: "Это пример описания",
    image: "https://via.placeholder.com/300",
    source: "user",
    createdAt: new Date(),
    liked: false,
};

function App() {
  return (
    <div className="App">
      <h1>🎯 Моё приложение с карточками</h1>
        <CardForm />
        <CardList />
        <Card card={testCard}/>
    </div>
  );
}

export default App;
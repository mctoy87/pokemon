import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { CardForm } from './components/CardForm';
import { CardList } from './components/CardList';
import { CardDetail } from "./components/CardDetail";

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Покемоны</h1>
      <Routes>
        <Route path='/' element={<Navigate to="/products" replace/>}/>
        <Route path="/products" element={<CardList />} />
        <Route path="/create-product" element={<CardForm />} /> 
        <Route path="/products/:id" element={<CardDetail />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </div>
  );
}

export default App;
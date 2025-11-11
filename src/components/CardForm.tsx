import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardsStore } from "../store/cardStore";
import type { Card as CardType } from "../types/Card";
import "./CardForm.css"; // Импортируем стили

export const CardForm: React.FC = () => {
  const addCard = useCardsStore((state) => state.addCard);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(""); // для отображения ошибок валидации
  
  const validate = (): boolean => {
    if (!title.trim()) {
      setError("Поле Название обязательно");
      return false;
    }
    if (!image.trim()) {
      setError("Поле URL картинки обязательно");
      return false;
    }
    
    setError("");
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newCard: CardType = {
      id: Date.now(),
      title,
      description,
      image,
      source: "user",
      createdAt: new Date(),
      liked: false
    };

    addCard(newCard);
    // После добавления карточки – очистить форму (если форма не будет сразу скрываться)
    setTitle("");
    setDescription("");
    setImage("");

    // Переход на страницу /products после добавления
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <h2>Создать новую карточку</h2>
      {error && <div className="card-form__error">{error}</div>}
      <input
        className="card-form__input"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="card-form__input"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <input
        className="card-form__input"
        placeholder="URL картинки"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        type="url"
      />
      <button className="card-form__button" type="submit">Добавить карточку</button>
    </form>
  );
};

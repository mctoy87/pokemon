import React, { useState } from "react";
import { useCardsStore } from "../store/cardStore";
import type { Card as CardType } from "../types/Card";

import "./CardForm.css"; // Импортируем стили

export const CardForm: React.FC = () => {
  const addCard = useCardsStore((state) => state.addCard);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !image.trim()) {
      alert("Пожалуйста, заполните поля заголовка и изображения");
      return;
    }

    const newCard: CardType = {
      id: Date.now(),
      title,
      description,
      image,
      source: "user",
      createdAt: new Date(),
    };

    addCard(newCard);

    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <input
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="URL картинки"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Добавить карточку</button>
    </form>
  );
};

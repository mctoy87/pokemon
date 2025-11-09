import React from "react";
import type { Card as CardType } from "../types/Card";
import "./Card.css";

interface CardProps {
  card: CardType;
  onDelete?: (id: number | string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onDelete }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.title} />
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <small>Источник: {card.source === "api" ? "API" : "Пользователь"}</small>
      {card.source === "user" && onDelete && (
        <button onClick={() => onDelete(card.id)}>×</button>
      )}
    </div>
  );
};
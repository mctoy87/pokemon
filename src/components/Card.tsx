import React from "react";
import type { Card as CardType } from "../types/Card";
import "./Card.css";
import deleteIcon from '../assets/delete.svg';



interface CardProps {
  card: CardType;
  onDelete?: (id: number | string) => void;
  onLikeToggle?: (id: number | string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onDelete, onLikeToggle }) => {
  return (
    <div className="card">
      <img className="card-image" src={card.image} alt={card.title} />
      <h3 className="card-title">{card.title}</h3>
      <p className="card-description">{card.description}</p>
      <small className="card-source">Источник: {card.source === "api" ? "API" : "Пользователь"}</small>
      <div className="card-action">
        <button 
          className={`card-likebtn ${card.liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onLikeToggle) onLikeToggle(card.id);
          }}
          aria-label={card.liked ? "Убрать из избранного" : "Добавить в избранное"}
          title={card.liked ? "Убрать из избранного" : "Добавить в избранное"}
        >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1 18.55l-.1.1-.11-.11C7.14 14.24 4 11.39 4 8.5
              4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99
              14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
            fill={card.liked ? "red" : "none"}
            stroke="red"
            strokeWidth="2"
          />
        </svg>
        </button>
      </div>
      {onDelete && (
        <button  
          className="card-del" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          aria-label="Удалить карточку"
          title="Удалить карточку"
        >
          <img src={deleteIcon} alt="Удалить" width={20} height={20} />
        </button>
      )}
    </div>
  );
};
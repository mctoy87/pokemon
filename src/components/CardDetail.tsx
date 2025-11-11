import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCardsStore } from "../store/cardStore";
import './CardDetail.css';

export const CardDetail: React.FC = () => {
  const { id } = useParams();        // id — строка из адреса. Например, "7"
  const navigate = useNavigate();

  // Переводим id из строки в число
  const cardId = id ? Number(id) : null;

  // Получаем список всех карточек из состояния
  const cards = useCardsStore((state) => state.cards);

  // Находим карточку по числовому id
  const card = cards.find((c) => c.id === cardId);

  if (!card) return <div>Карточка не найдена</div>;

  return (
    <div className="card-detail" >
      <button className="card-detail__btn-nav" onClick={() => navigate('/')}>На главную</button>
      <h2 className="card-detail__title" >{card.title}</h2>
      <img className="card-detail__image"  src={card.image} alt={card.title} />
      <p className="card-detail__description" >{card.description}</p>
      <p className="card-detail__info" >Источник: {card.source === "api" ? "API" : "Пользователь"}</p>
      <p className="card-detail__liked" >В избранном: {card.liked ? "Да" : "Нет"}</p>
    </div>
  );
};

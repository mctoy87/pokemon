import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCardsStore } from "../store/cardStore";
import { Card } from "./Card";
import "./CardList.css";


export const CardList:React.FC = () => {
  const cards = useCardsStore((state) => state.cards);
  const removeCard = useCardsStore((state) => state.removeCard);
  const fetchCardsFromApi = useCardsStore((state) => state.fetchCardsFromApi);
  const isLoading = useCardsStore((state) => state.isLoading);
  const error = useCardsStore((state) => state.error);
  const toggleLike = useCardsStore((state) => state.toggleLike);

  // Локальное состояние для фильтра: 'all' или 'liked'
  const [filter, setFilter] = useState('all');;

  // Вызов загрузки карточек при монтировании
  useEffect(() => {
    if (cards.length === 0) fetchCardsFromApi();
  }, [cards.length, fetchCardsFromApi]);

  // Фильтруем карточки по выбранному фильтру
  const filteredCards =
    filter === "liked" ? cards.filter((card) => card.liked) : cards;
  
  if (isLoading) return <div>Загрузка карточек...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  console.log(cards);

  return (
    <div className="card-list">
      <div className="card-list__filter">
        <button
          className={`card-list__filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
          aria-label="Показать все карточки"
        >
          Все
        </button>
        <button
          className={`card-list__filter-button ${filter === "liked" ? "active" : ""}`}
          onClick={() => setFilter("liked")}
          aria-label="Показать избранные карточки"
        >
          Избранные
        </button>
      </div>
      
      <div className="card-list__wrapper">
        {filteredCards.length === 0 ? (
          <div>Нет карточек для отображения</div>
        ) : (
          filteredCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={removeCard}
            onLikeToggle={toggleLike}
          />
          ))
        )}
      </div>
      <Link  className="link-create-card" to="/create-product">+ Добавить продукт</Link>
    </div>
  );
};
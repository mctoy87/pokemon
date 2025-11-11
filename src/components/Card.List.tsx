import React, { useEffect } from "react";
import { useCardsStore } from "../store/cardStore";
import { Card } from "./Card";


export const CardList:React.FC = () => {
  const cards = useCardsStore((state) => state.cards);
  const removeCard = useCardsStore((state) => state.removeCard);
  const fetchCardsFromApi = useCardsStore((state) => state.fetchCardsFromApi);
  const isLoading = useCardsStore((state) => state.isLoading);
  const error = useCardsStore((state) => state.error);
  const toggleLike = useCardsStore((state) => state.toggleLike);

  // Вызов загрузки карточек при монтировании
  useEffect(() => {
    fetchCardsFromApi();
  }, [fetchCardsFromApi]);

  if (isLoading) return <div>Загрузка карточек...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDelete={removeCard}
          onLikeToggle={toggleLike}
        />
      ))}
    </div>
  );
};
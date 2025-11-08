import { create } from "zustand";
import { Card } from "../types/Card";

// Интерфейс для store
interface CardsStore {
  // STATE (данные)
  cards: Card[];
  isLoading: boolean;
  error: string | null;

  // ACTIONS (функции)
  addCard: (card: Card) => void;
  removeCard: (id: number | string) => void;
  setCards: (cards: Card[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Создаём store
export const useCardsStore = create<CardsStore>((set) => ({
  // Начальное состояние
  cards: [],
  isLoading: false, 
  error: null,

  // Добавить одну карточку (например, созданную пользователем)
  addCard: (card) => 
    set((state) => ({
      cards: [...state.cards, card],
    })),

  // Удалить карточку по ID
  removeCard: (id) => 
    set((state) => ({
      cards: state.cards.filter((card) => card.id !=== id),
    })),

  // Установить весь список карточек (например, из API)
  setCards: (cards) =>
    set({ cards }),

  // Установить статус загрузки
  setLoading: (loading) =>
    set({ isLoading: loading }),

  // Установить ошибку
  setError: (error) =>
    set({ error }),
}));

import { create } from "zustand";
import type { Card } from "../types/Card";
import axios from "axios";

interface PokemonListItem {
  name: string;
  url: string;
}

// Интерфейс для store
interface CardsStore {
  // STATE (данные)
  cards: Card[];
  isLoading: boolean;
  error: string | null;

  // ACTIONS (функции)
  addCard: (card: Card) => void;
  removeCard: (id: number | string) => void;
  toggleLike: (id: number | string) => void;
  setCards: (cards: Card[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCardsFromApi: () => Promise<void>;
}

const API_URL = "https://pokeapi.co/api/v2";

// Создаём store
export const useCardsStore = create<CardsStore>((set, get) => ({
  // Начальное состояние
  cards: [],
  isLoading: false, 
  error: null,

  // Добавить одну карточку (например, созданную пользователем)
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),

  // Удалить карточку по ID
  removeCard: (id) => set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
  
  //метод лайк
  toggleLike: (id) => { 
    const cards = get().cards.map((card) => 
      card.id === id ? {...card, liked: !card.liked} : card
    );
    set({ cards });
  },

  // Установить весь список карточек (например, из API)
  setCards: (cards) => set({ cards }),

  // Установить статус загрузки
  setLoading: (loading) => set({ isLoading: loading }),

  // Установить ошибку
  setError: (error) => set({ error }),

  // делаем запрос к АПИ
  fetchCardsFromApi: async () => { set({ isLoading: true, error: null });

    
    try {
      const { data } = await axios.get(`${API_URL}/pokemon?limit=10`);

      const cards = await Promise.all(
        data.results.map(async (pokemon: PokemonListItem) => {
          const details = await axios.get(pokemon.url);
          const d = details.data;
          return {
            id: d.id,
            title: d.name,
            description: `Тип: ${d.types[0].type.name}, высота: ${d.height}`,
            image: d.sprites.other["official-artwork"].front_default,
            source: "api" as const,
            liked: false,
          } as Card;
        })
      );

      set({ cards, isLoading: false });
    } catch (error) {
      set({ error: "Ошибка при загрузке покемонов", isLoading: false });
      console.error(error);
    }
  },
}));

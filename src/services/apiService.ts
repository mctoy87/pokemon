import axios from "axios";

const API_URL = 'https://pokeapi.co/api/v2';

// Интерфейс для данных покемона из API
export interface PokemonData {
  id: number;
  name: string;
  image: string;
  type: string;
  height: number;
}

// Функция для загрузки списка покемонов
export async function fetchPokemonCards(): Promise<PokemonData[]> {
  try {
    // Шаг 1: Загружаем список первых 20 покемонов
    const response = await axios.get(`${API_URL}/pokemon?limit=20`);

     // Шаг 2: Для каждого покемона получаем подробную информацию
    const pokemonPromises = response.data.results.map(async (pokemon: any) => {
      const details = await axios.get(pokemon.url);

      return {
        id: details.data.id,
        name: details.data.name,
        image: details.data.sprites.other['official-artwork'].front_default,
        type: details.data.types[0].type.name,
        height: details.data.height,
      };
    });

    // Шаг 3: Ждём, пока все запросы завершатся
    return Promise.all(pokemonPromises);

  } catch (error) {
    console.error('Ошибка при загрузке покемонов:', error);
    throw error;
  }
}
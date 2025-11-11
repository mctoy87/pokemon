// Интерфейс для одной карточки
export interface Card {
  id: number | string;
  title: string;
  description: string;
  image: string;
  source: 'api' | 'user';       // откуда карточка: из API или создана пользователем
  createdAt?: Date;             // опциональное поле (только для созданных пользователем)
  liked: boolean;               // есть ли лайк на карточке
}
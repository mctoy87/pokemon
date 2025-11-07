import React from 'react';
import { useCounterStore } from '../store/counterStore';

export const Counter: React.FC = () => {
  //Подписываемся на данные из store
  const count = useCounterStore((state) => state.count);
  //Подписываемся на действия из store
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        border: '2px solid #4CAF50',
        borderRadius: '8px',
        maxWidth: '300px',
        margin: '20px auto'
    }}>
        <h2>Счётчик с Zustand</h2>
        <p style={{ fontSize: '48px', margin: '20px 0' }}>
            {count}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={increment} style={buttonStyle}>
                ➕ Увеличить
            </button>
            <button onClick={decrement} style={buttonStyle}>
                ➖ Уменьшить
            </button>
            <button onClick={reset} style={buttonStyle}>
                🔄 Сбросить
            </button>
        </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#4CAF50',
  color: 'white',
  transition: 'background-color 0.3s',
};

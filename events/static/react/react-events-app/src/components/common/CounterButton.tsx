import React, { useState, useEffect } from 'react';
import { Counter, CounterButtonProps } from '../../interfaces/types';
import { useApi } from '../../hooks/useApi';

const CounterButton: React.FC<CounterButtonProps> = ({ counterId }) => {
  const [value, setValue] = useState<number>(0);
  const { fetchWithCSRF } = useApi();

  useEffect(() => {
    fetchWithCSRF(`api/counter/${counterId}/`, { method: 'GET' })
      .then((data: Counter) => setValue(data.value))
      .catch((error: any) =>
        console.error('Error fetching initial counter value:', error)
      );
  }, [counterId, fetchWithCSRF]);

  const incrementCounter = () => {
    fetchWithCSRF(`api/counter/${counterId}/increment/`, {
      method: 'POST',
    })
      .then((data: Counter) => {
        if (data.value !== undefined) {
          setValue(data.value);
        } else {
          console.error('Increment failed:', data);
        }
      })
      .catch((error: any) => console.error('Error:', error));
  };

  return (
    <div>
      <p>Current Value: {value}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
};

export default CounterButton;

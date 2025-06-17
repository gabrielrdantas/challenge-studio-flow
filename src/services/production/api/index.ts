const fetchProductions = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/productions`);

  if (!response.ok) {
    throw new Error('Falha ao buscar produções');
  }

  const data = await response.json();
  return data;
};

export { fetchProductions };

import { type Scene } from '../reducers/SceneReducer';

const fetchScenes = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
  if (!response.ok) throw new Error('Falha ao buscar cenas');

  const data = await response.json();
  return data;
};

const saveScene = async (newScene: Scene) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newScene,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    }),
  });

   if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao salvar cena');
  }
  const data = await response.json();

  return data;
};

const updateScene = async (editedScene: Scene) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes/${editedScene.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...editedScene,
      updatedAt: new Date().toISOString(),
      version: Math.random(),
    }),
  });

   if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao atualizar cena');
  }
  const data = await response.json();
  
  return data;
};

export { fetchScenes, saveScene, updateScene };

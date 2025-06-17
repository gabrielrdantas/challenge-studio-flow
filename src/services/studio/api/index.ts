import { type Scene } from '../reducers/SceneReducer';

const fetchScenes = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
  if (!response.ok) throw new Error('Failed to fetch scenes');

  const data = await response.json();
  return data;
};

const saveScene = async (newScene: Scene) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`, {
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
  const data = await response.json();
  return data;
};

export { fetchScenes, saveScene, updateScene };

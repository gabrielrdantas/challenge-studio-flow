import { toast } from 'sonner';
import { createContext, useEffect, useReducer } from 'react';
import { type ReactNode } from 'react';

import { arrayMove } from '@dnd-kit/sortable';

import { fetchScenes } from '../api';
import { type Scene as SceneDetails } from '../reducers/SceneReducer';
import { initialSceneState, sceneReducer } from '../reducers/SceneReducer';

interface ScenesContextType {
  scenes: SceneDetails[];
  error: string | null;
  filteredScene: SceneDetails[];
  setNewStepScene: (fromScene: SceneDetails, toScene: SceneDetails) => void;
  handleSceneUpdate: (scene: SceneDetails) => void;
  setSortableScene: (fromScene: SceneDetails, toScene: SceneDetails) => void;
  searchScene: (title: string) => void;
}

const ScenesContext = createContext<ScenesContextType | undefined>(undefined);

function ScenesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sceneReducer, initialSceneState);

  const getScenes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await fetchScenes();
      dispatch({ type: 'SET_SCENES', payload: data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch scenes';
      dispatch({
        type: 'SET_ERROR',
        payload: message,
      });
      toast.error(message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const isSameStep = (fromScene: SceneDetails, toScene: SceneDetails) => {
    return fromScene.step === toScene.step;
  };

  const isNextStep = (fromScene: SceneDetails, toScene: SceneDetails) => {
    return (toScene.step - fromScene.step) === 1  && state.filteredScene.length === 0;
  };
  const setSortableScene = (fromScene: SceneDetails, toScene: SceneDetails) => {
    if (!isSameStep(fromScene, toScene) || state.filteredScene.length > 0) {
      return;
    }
    const currentScenes = state.scenes.filter((scene) => scene.step === fromScene.step);
    const fromIndex = currentScenes.findIndex((scene) => scene.id === fromScene.id);
    const toIndex = currentScenes.findIndex((scene) => scene.id === toScene.id);
    const reorderedScenesColumnSelected = arrayMove(currentScenes, fromIndex, toIndex);
    const othersScenes = state.scenes.filter((scene) => scene.step !== fromScene.step);
    const updatedScenes = [...othersScenes, ...reorderedScenesColumnSelected];
    dispatch({ type: 'SET_SCENES', payload: updatedScenes });
  };

  const setNewStepScene = (fromScene: SceneDetails, toScene: SceneDetails) => {
    if (!isNextStep(fromScene, toScene)) {
       toast.error('Você só pode mover a cena para o próximo passo ou para a mesma etapa. ');
      return;
    }
    dispatch({
      type: 'MOVE_SCENE',
      payload: {
        id: fromScene.id as string,
        toStep: toScene.step,
      },
    });
  };

  const handleSceneUpdate = (updatedScene: SceneDetails) => {
    dispatch({
      type: 'UPDATE_SCENE',
      payload: updatedScene,
    });
  };

  const searchScene = (title: string) => {

    if (!title?.trim()) {
      dispatch({
        type: 'SET_SCENES_FILTERED',
        payload: [],
      });
      return;
    }

    dispatch({
      type: 'SET_SCENES_FILTERED',
      payload: state.scenes.filter((scene) =>
        scene?.title?.trim()?.toLowerCase().includes(title?.trim().toLowerCase()),
      ),
    });
  };

  useEffect(() => {
    getScenes();
  }, []);

  return (
    <ScenesContext.Provider
      value={{
        ...state,
        setNewStepScene,
        handleSceneUpdate,
        setSortableScene,
        searchScene,
        scenes: state.filteredScene?.length > 0 ? state.filteredScene : state.scenes,
      }}
    >
      {children}
    </ScenesContext.Provider>
  );
}

export { ScenesProvider, ScenesContext };

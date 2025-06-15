import { useEffect, useReducer, useState } from 'react';

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ArrowLeftIcon, PlayIcon } from 'lucide-react';

import { useProduction } from '../../services/studio/hooks/useProduction';
import {
  type Scene as SceneDetails,
  initialSceneState,
  sceneReducer,
} from '../../services/studio/reducers/scenes';
import { Button } from '../../shared/components/button';
import { Card } from '../../shared/components/card';
import { Column } from '../../shared/components/column';
import Title from '../../shared/components/title';
import { Scene, type SceneProps } from './components/scene';

const steps: Record<number, string> = {
  1: 'Roteirizado',
  2: 'Em pré-produção',
  3: 'Em gravação',
  4: 'Em pós-produção',
  5: 'Finalizado',
};

const Studio = () => {
  const { selectedProduction, productions, selectProduction, deselectProduction } = useProduction();
  const [state, dispatch] = useReducer(sceneReducer, initialSceneState);
  const [activeScene, setActiveScene] = useState<SceneProps | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveScene({
      id: active.id as string,
      step: active.data.current?.step,
      columnId: active.data.current?.columnId,
      title: active.data.current?.title,
      description: active.data.current?.description,
      episode: active.data.current?.episode,
      recordDate: active.data.current?.recordDate,
      recordLocation: active.data.current?.recordLocation,
    });
  };

  const sortableScene = (fromScene: SceneDetails, toScene: SceneDetails) => {
    const currentScenes = state.scenes.filter((scene) => scene.step === fromScene.step);
    const fromIndex = currentScenes.findIndex((scene) => scene.id === fromScene.id);
    const toIndex = currentScenes.findIndex((scene) => scene.id === toScene.id);
    const reorderedScenesColumnSelected = arrayMove(currentScenes, fromIndex, toIndex);
    const othersScenes = state.scenes.filter((scene) => scene.step !== fromScene.step);
    const updatedScenes = [...othersScenes, ...reorderedScenesColumnSelected];
    dispatch({ type: 'SET_SCENES', payload: updatedScenes });
  };

  const isSameStep = (fromScene: SceneDetails, toScene: SceneDetails) => {
    return fromScene.step === toScene.step;
  };

  const isNextStep = (fromScene: SceneDetails, toScene: SceneDetails) => {
    return fromScene.step < toScene.step;
  };

  const moveSceneToStep = (fromScene: SceneDetails, toScene: SceneDetails) => {
    if (!isNextStep(fromScene, toScene)) return;
    dispatch({
      type: 'MOVE_SCENE',
      payload: {
        id: fromScene.id as string,
        toStep: toScene.step,
      },
    });
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    setActiveScene(null);

    const fromScene = state.scenes.find((scene) => scene.id === (active.id as string));
    const toScene = state.scenes.find((scene) => scene.id === (over.id as string));

    if (!fromScene || !toScene) return;

    if (isSameStep(fromScene, toScene)) {
      sortableScene(fromScene, toScene);
      return;
    }
    if (isNextStep(fromScene, toScene)) {
      moveSceneToStep(fromScene, toScene);
    }
  };

  const handleSceneUpdate = (updatedScene: SceneDetails) => {
    dispatch({
      type: 'UPDATE_SCENE',
      payload: updatedScene,
    });
  };

  const fetchScenes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/scenes`);
      if (!response.ok) throw new Error('Failed to fetch scenes');

      const data = await response.json();
      dispatch({ type: 'SET_SCENES', payload: data });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );

  useEffect(() => {
    fetchScenes();
  }, []);

  if (!selectedProduction) {
    return (
      <div className='w-screen bg-background p-4 flex flex-col gap-4'>
        <div className='flex flex-wrap gap-4'>
          {productions.map((production) => (
            <Card
              key={production.id}
              icon={<PlayIcon />}
              title={production.name}
              subtitle={production.description}
              quickLinks={[
                {
                  label: 'Ir para produção',
                  onClick: () => {
                    selectProduction(production);
                  },
                },
              ]}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className='w-full bg-background p-4 flex flex-col gap-4 h-full'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' onClick={() => deselectProduction()}>
          <ArrowLeftIcon />
        </Button>
        <Title title={selectedProduction?.name} />
      </div>
      <div className='flex gap-4 overflow-x-auto w-full h-full'>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
          <DragOverlay>{activeScene ? <Scene {...activeScene} /> : null}</DragOverlay>
          {[1, 2, 3, 4, 5].map((step) => {
            const selectedScenesColumn = state.scenes.filter((scene) => scene.step === step);
            return (
              <Column
                key={step}
                id={`column-${step}`}
                step={step}
                label={steps[step]}
                count={selectedScenesColumn.length}
              >
                <SortableContext
                  items={selectedScenesColumn}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedScenesColumn
                    .filter((scene) => scene.id !== activeScene?.id)
                    .map((scene) => (
                      <Scene key={scene.id} {...scene} onUpdate={handleSceneUpdate} />
                    ))}
                </SortableContext>
              </Column>
            );
          })}
        </DndContext>
      </div>
    </section>
  );
};

export default Studio;

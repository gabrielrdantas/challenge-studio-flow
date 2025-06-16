import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '../../components/button';
import { Column } from '../../components/column';
import Title from '../../components/title';
import { useProductionContext } from '../../services/production/hooks/production';
import { useScenesContext } from '../../services/studio/hooks/scenes';
import { Scene, type SceneProps } from './components/scene';

const steps: Record<number, string> = {
  1: 'Roteirizado',
  2: 'Em pré-produção',
  3: 'Em gravação',
  4: 'Em pós-produção',
  5: 'Finalizado',
};

const Studio = () => {
  const { selectedProduction, deselectProduction, selectProductionById } = useProductionContext();
  const { scenes, filteredScene, setSortableScene, setNewStepScene, handleSceneUpdate } =
    useScenesContext();
  const [activeScene, setActiveScene] = useState<SceneProps | null>(null);

  const stepList = useMemo(() => Object.keys(steps).map(Number), []);
  const { id: productionId } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (filteredScene.length > 0) {
      return;
    }

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    setActiveScene(null);

    const fromScene = scenes.find((scene) => scene.id === (active.id as string));
    const toScene = scenes.find((scene) => scene.id === (over.id as string));

    if (!fromScene || !toScene) return;
    setSortableScene(fromScene, toScene);
    setNewStepScene(fromScene, toScene);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: filteredScene.length > 0 ? 99999 : 100,
        tolerance: 5,
      },
    }),
  );

  const handleBackProduction = () => {
    deselectProduction();
    navigate('/');
  };

  useCallback(() => {
    if (!selectedProduction && productionId) {
      selectProductionById(productionId);
    }
  }, [selectedProduction, selectProductionById, productionId]);

  return selectedProduction ? (
    <section className='w-full bg-background p-4 flex flex-col gap-4 h-full'>
      <div className='flex items-center gap-4'>
        <Button
          className='cursor-pointer'
          variant='outline'
          size='icon'
          onClick={() => handleBackProduction()}
        >
          <ArrowLeftIcon />
        </Button>
        <Title title={selectedProduction.name} />
      </div>
      <div className='flex gap-4 overflow-x-auto w-full h-full'>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
          <DragOverlay>{activeScene ? <Scene {...activeScene} /> : null}</DragOverlay>
          {stepList.map((step) => {
            const scenesByStep = scenes.filter((scene) => scene.step === step);
            return (
              <Column
                key={step}
                id={`column-${step}`}
                step={step}
                label={steps[step]}
                count={scenesByStep.length}
              >
                <SortableContext items={scenesByStep} strategy={verticalListSortingStrategy}>
                  {scenesByStep.map((scene) => (
                    <Scene key={scene.id} {...scene} onUpdate={handleSceneUpdate} />
                  ))}
                </SortableContext>
              </Column>
            );
          })}
        </DndContext>
      </div>
    </section>
  ) : null;
};

export default Studio;

import React, { useCallback, useMemo, useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { SceneModal } from '../../../../modals/scene';
import { type Scene as SceneType } from '../../../../services/studio/reducers/SceneReducer';

interface SceneProps {
  id: string;
  step: number;
  title: string;
  columnId: string;
  description: string;
  episode: string;
  recordDate: string;
  recordLocation: string;
  onUpdate?: (scene: SceneType) => void;
}

const Scene = React.memo(({
  id,
  title,
  description,
  columnId,
  step,
  episode,
  recordDate,
  recordLocation,
  onUpdate,
}: SceneProps) => {
  const [isUpdateSceneModalOpen, setIsUpdateSceneModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transition, transform, active, isDragging } = useSortable({
    id,
    attributes: { role: 'button' },
    data: {
      columnId,
      step,
      title,
      description,
      episode,
      recordDate,
      recordLocation,
    },
  });

  const sceneDetails = useMemo(() => ({
    id,
    title,
    description,
    step,
    episode,
    columnId,
    recordDate,
    recordLocation,
  }), [id, title, description, step, episode, columnId, recordDate, recordLocation]);

  const handleUpdate = useCallback((updatedScene: SceneType) => {
    onUpdate?.(updatedScene);
  }, [onUpdate]);

  if (active?.id === id) {
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
        }}
        {...listeners}
        {...attributes}
        className='flex flex-col gap-2 p-2 cursor-pointer bg-primary opacity-50 text-accent rounded-lg border border-border'
      >
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium'>{title?.trim()}</span>
          <span className='text-xs'>{description?.trim()}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SceneModal
        isOpen={isUpdateSceneModalOpen}
        onClose={() => setIsUpdateSceneModalOpen(false)}
        scene={sceneDetails}
        onFinish={handleUpdate}
      />

      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Translate.toString(transform),
        }}
        {...listeners}
        {...attributes}
        onClick={() => setIsUpdateSceneModalOpen(true)}
        className='flex flex-col gap-2 p-2 cursor-pointer bg-primary text-accent rounded-lg border border-border scene-card'
      >
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium'>{title.trim()}</span>
          <span className='text-xs'>{description.trim()}</span>
        </div>
      </div>
    </div>
  );
});

export { Scene, type SceneProps };


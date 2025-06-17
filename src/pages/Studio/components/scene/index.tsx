import { useMemo, useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { UpdateSceneModal } from '../../../../modals/scene/update';
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

const Scene = ({
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

  const { attributes, listeners, setNodeRef, transform, active } = useSortable({
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

  const sceneDetails: SceneType = {
    id,
    title,
    description,
    step,
    episode,
    columnId,
    recordDate,
    recordLocation,
  };

  const handleUpdate = (updatedScene: SceneType) => onUpdate?.(updatedScene);

  if (active?.id === id) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className='flex flex-col gap-2 p-2 cursor-pointer bg-primary opacity-50 text-accent rounded-lg border border-border'
      >
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium'>{computedTitle}</span>
          <span className='text-xs'>{computedDescription}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UpdateSceneModal
        isOpen={isUpdateSceneModalOpen}
        onClose={() => setIsUpdateSceneModalOpen(false)}
        scene={sceneDetails}
        onUpdate={handleUpdate}
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
};

export { Scene, type SceneProps };

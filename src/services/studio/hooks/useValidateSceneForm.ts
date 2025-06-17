import { useMemo } from 'react';
import { type Scene } from '../reducers/SceneReducer';

export const useValidateSceneForm = (scene: Scene): boolean => {
  return useMemo(() => {
    const requiredFields: (keyof Scene)[] = [
      'title',
      'description',
      'episode',
      'step',
      'recordDate',
      'recordLocation',
    ];

    if (Object.keys(scene).length < requiredFields.length){
      return false
    }

    const hasEmptyField = requiredFields.some((field) => {
      const value = scene[field];
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      );
    });

    return !hasEmptyField;
  }, [scene]);
};

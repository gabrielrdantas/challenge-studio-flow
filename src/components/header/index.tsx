import { useEffect, useState } from 'react';

import { SceneModal } from '../../modals/scene';
import { useScenesContext } from '../../services/studio/hooks/useScenesContext';
import { Button } from '../button';
import { Input } from '../input';
import { Profile } from '../profile';
import { useProductionContext } from '../../services/production/hooks/useProductionsContext';

export function Header() {
  const [search, setSearch] = useState('');

  const [isCreateSceneModalOpen, setIsCreateSceneModalOpen] = useState(false);
  const { searchScene } = useScenesContext();
  const { selectedProduction } = useProductionContext();
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchScene(search);
    }, 350);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if(!selectedProduction) {
      searchScene('');
    }
  }, [selectedProduction]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full gap-8 px-6 py-4 border-b border-border bg-background'>
      <div className='flex items-center gap-12'>
        <h1 className='text-xl font-semibold text-foreground'>StudioFlow</h1>
      </div>

      {selectedProduction && <div className='flex items-center gap-2 grow justify-center max-w-xl'>
        <Input placeholder='Digite o titulo da cena' className='grow' onInput={handleSearchInput} />
        <Button className="cursor-pointer" variant='default' onClick={() => setIsCreateSceneModalOpen(true)}>
          Criar
        </Button>
      </div>}

      <Profile />

      <SceneModal
        isOpen={isCreateSceneModalOpen}
        onClose={() => setIsCreateSceneModalOpen(false)} />
    </header>
  );
}

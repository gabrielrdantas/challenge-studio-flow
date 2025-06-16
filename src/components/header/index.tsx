import { useEffect, useState } from 'react';

import { CreateSceneModal } from '../../modals/scene/create';
import { useScenesContext } from '../../services/studio/hooks/scenes';
import { Button } from '../button';
import { Input } from '../input';
import { Profile } from '../profile';

export function Header() {
  const [search, setSearch] = useState('');

  const [isCreateSceneModalOpen, setIsCreateSceneModalOpen] = useState(false);
  const { searchScene } = useScenesContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchScene(search);
    }, 350);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full gap-8 px-6 py-4 border-b border-border bg-background'>
      <div className='flex items-center gap-12'>
        <h1 className='text-xl font-semibold text-foreground'>StudioFlow</h1>
      </div>

      <div className='flex items-center gap-2 grow justify-center max-w-xl'>
        <Input placeholder='Digite o titulo da cena' className='grow' onInput={handleSearchInput} />
        <Button variant='default' onClick={() => setIsCreateSceneModalOpen(true)}>
          Criar
        </Button>
      </div>

      <Profile />

      <CreateSceneModal
        isOpen={isCreateSceneModalOpen}
        onClose={() => setIsCreateSceneModalOpen(false)}
      />
    </header>
  );
}

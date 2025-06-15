import { useState } from 'react';

import { CreateSceneModal } from '../../../modal/studio/create';
import { Button } from '../button';
import { Input } from '../input';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full gap-8 px-6 py-4 border-b border-border bg-background'>
      <div className='flex items-center gap-12'>
        <h1 className='text-xl font-semibold text-foreground'>StudioFlow</h1>
      </div>

      <div className='flex items-center gap-2 grow justify-center max-w-xl'>
        <Input placeholder='Pesquisar' className='grow' />
        <Button variant='default' onClick={() => setIsModalOpen(true)}>Criar</Button>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-sm text-muted-foreground'>John Doe</span>
        <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium'>
          JD
        </div>
      </div>

      <CreateSceneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

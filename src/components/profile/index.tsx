import { useEffect, useState } from 'react';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Moon, Sun } from 'lucide-react';

export function Profile() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) setTheme(stored);
    document.documentElement.classList.toggle('dark', stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className='flex items-center gap-3'>
      <Popover className='relative'>
        <PopoverButton className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground cursor-pointer'>John Doe</span>
          <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium'>
            JD
          </div>
        </PopoverButton>

        <PopoverPanel className='absolute z-50 mt-2 right-0 w-48 rounded-md bg-white dark:bg-zinc-900 shadow-md p-4 text-sm border border-border'>
          <div className='text-muted-foreground'>Informações ou ações adicionais aqui</div>
        </PopoverPanel>
      </Popover>

      <button
        id="theme-toggle-button"
        onClick={toggleTheme}
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer
          ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
}

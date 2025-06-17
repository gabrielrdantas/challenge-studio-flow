import { cn } from './index';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('text-sm', 'text-blue-500')).toBe('text-sm text-blue-500');
  });

  it('removes duplicate tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('ignores falsy values', () => {
    expect(cn('text-sm', undefined, null, false, '')).toBe('text-sm');
  });

  it('merges conditional classes with clsx logic', () => {
    expect(cn('text-sm', { 'text-red-500': true, 'text-green-500': false })).toBe('text-sm text-red-500');
  });
});

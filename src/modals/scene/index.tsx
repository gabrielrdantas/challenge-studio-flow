import { Fragment, useEffect, useMemo, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';

import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import { saveScene, updateScene } from '../../services/studio/api';
import { type Scene as SceneDetails } from '../../services/studio/reducers/SceneReducer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene?: SceneDetails; // undefined for creation
  onFinish?: (scene: SceneDetails) => void;
}

const steps: Record<number, string> = {
  1: 'Roteirizado',
  2: 'Em pré-produção',
  3: 'Em gravação',
  4: 'Em pós-produção',
  5: 'Finalizado',
};

const SceneModal = ({ isOpen, onClose, scene, onFinish }: ModalProps) => {
  const isEdit = !!scene;
  const [formData, setFormData] = useState<SceneDetails>(scene || ({} as SceneDetails));
  const [isSaving, setIsSaving] = useState(false);

  const statusList = useMemo(() => {
    if (!isEdit) return Object.values(steps);
    return Object.values(steps).slice(scene.step - 1, scene.step + 1);
  }, [isEdit, scene?.step]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(scene || ({} as SceneDetails));
    }
  }, [isOpen, scene]);

  const handleChange = (field: keyof SceneDetails, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateErrorDate = () => {
    const dateLimit = scene?.recordDate ? new Date(`${scene.recordDate}T00:00:00`): new Date();
    dateLimit.setHours(0, 0, 0, 0);
    const selected = new Date(`${formData.recordDate}T00:00:00`);
    selected.setHours(0, 0, 0, 0);
    return selected < dateLimit;
  };

  const handleSave = async () => {
    if (validateErrorDate()) {
      toast.error('A data de gravação não pode ser anterior a hoje.');
      return;
    }

    setIsSaving(true);
    try {
      const savedScene = isEdit ? await updateScene(formData) : await saveScene(formData);
      onFinish?.(savedScene);
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar cena.';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

   return (
     <Transition appear show={isOpen} as={Fragment}>
       <Dialog as='div' className='relative z-50' onClose={onClose}>
         <TransitionChild
           as={Fragment}
           enter='ease-out duration-300'
           enterFrom='opacity-0'
           enterTo='opacity-100'
           leave='ease-in duration-200'
           leaveFrom='opacity-100'
           leaveTo='opacity-0'
         >
           <div className='fixed inset-0 bg-black/25' />
         </TransitionChild>
 
         <div className='fixed inset-0 overflow-y-auto'>
           <div className='flex min-h-full items-center justify-center p-4 text-center'>
             <TransitionChild
               as={Fragment}
               enter='ease-out duration-300'
               enterFrom='opacity-0 scale-95'
               enterTo='opacity-100 scale-100'
               leave='ease-in duration-200'
               leaveFrom='opacity-100 scale-100'
               leaveTo='opacity-0 scale-95'
             >
               <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all'>
                 <div className='flex items-center justify-between mb-4'>
                   <DialogTitle as='h3' className='text-lg font-medium leading-6 text-primary'>
                     Detalhes da Cena
                   </DialogTitle>
                   <button
                     onClick={onClose}
                     className='rounded-full p-1 hover:bg-primary/10 transition-colors'
                   >
                     <XIcon className='h-5 w-5 text-primary' />
                   </button>
                 </div>
 
                 
                   <div className='space-y-4'>
                     <div>
                       <label htmlFor="title"  className='text-sm font-medium text-primary/70'>Título</label>
                       <input
                        id="title"
                         type='text'
                         value={formData.title}
                         onChange={(e) => handleChange('title', e.target.value)}
                         className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                       />
                     </div>
 
                     <div>
                       <label htmlFor="description" className='text-sm font-medium text-primary/70'>Descrição</label>
                       <textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                          rows={3}
                       />
                     </div>
 
                     <div>
                       <label htmlFor="episode" className='text-sm font-medium text-primary/70'>Episódio</label>
                       <input
                          id="episode"
                          type='text'
                          value={formData.episode}
                          onChange={(e) => handleChange('episode', e.target.value)}
                          className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                       />
                     </div>
 
                     <div>
                       <label htmlFor="step" className='text-sm font-medium text-primary/70'>Status</label>
                       <select
                          id="step"
                          value={formData.step}
                          onChange={(e) => handleChange('step', Number(e.target.value))}
                          className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                       >
                         {statusList.map((label, step) => (
                           <option key={label + step} value={step + 1}>
                             {label}
                           </option>
                         ))}
                       </select>
                     </div>
                     <div>
                       <label htmlFor="recordDate" className="block  text-sm font-medium text-primary/70">Data de Gravação</label>
                       <DatePicker
                         id="recordDate"
                         selected={formData.recordDate ? new Date(`${formData.recordDate}T00:00:00`) : null}
                         minDate={scene?.recordDate ? new Date(`${scene.recordDate}T00:00:00`): new Date()}
                         onChange={(date) => handleChange('recordDate', date?.toISOString().split('T')[0] ?? '')}
                         locale={ptBR}
                         dateFormat="dd/MM/yyyy"
                         className="block w-full mt-1 rounded-md border border-border bg-background px-3 py-2 text-primary"
                         wrapperClassName="w-full"
                       />
                     </div>
 
                     <div>
                       <label htmlFor="recordLocation" className='text-sm font-medium text-primary/70'>Local de Gravação</label>
                       <input
                          id="recordLocation"
                          type='text'
                          value={formData.recordLocation}
                          onChange={(e) => handleChange('recordLocation', e.target.value)}
                          className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                       />
                     </div>
 
                     <div className='mt-6 flex justify-end gap-3'>
                       <button
                         onClick={onClose}
                         className='rounded-md px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10'
                       >
                         Cancelar
                       </button>
                       <button
                         onClick={() => handleSave()}
                         disabled={isSaving}
                         className='cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-accent hover:bg-primary/90 disabled:opacity-50'
                       >
                         {isSaving ? 'Salvando...' : 'Salvar'}
                       </button>
                     </div>
                   </div> 
               </DialogPanel>
             </TransitionChild>
           </div>
         </div>
       </Dialog>
     </Transition>
   );
};

export { SceneModal };

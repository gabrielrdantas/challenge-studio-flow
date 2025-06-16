import { useNavigate } from 'react-router-dom';

import { PlayIcon } from 'lucide-react';

import { Card } from '../../components/card';
import { useProductionContext } from '../../services/production/hooks/production';
import { type TProduction } from '../../services/production/reducers/production';

export const Production = () => {
  const { productions, selectProduction } = useProductionContext();
  const navigate = useNavigate();

  const handleSelectProduction = (production: TProduction) => {
    selectProduction(production);
    navigate('/production/' + production.id);
  };

  return productions ? (
    <div className='w-screen bg-background p-4 flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {productions?.map((production) => (
          <Card
            key={production.id}
            icon={<PlayIcon />}
            title={production.name}
            subtitle={production.description}
            quickLinks={[
              {
                label: 'Ir para produção',
                onClick: () => {
                  handleSelectProduction(production);
                },
              },
            ]}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Production;

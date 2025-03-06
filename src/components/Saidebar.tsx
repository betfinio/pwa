import { Link } from '@tanstack/react-router';
import { mfQueryClient } from '../config/query';
import { useContextManifest } from '../lib/query/mf';
import { cn } from '@betfinio/components';

const linkMapping: Record<string, string> = {
  staking: '/staking',
  'staking-conservative': '/staking/conservative',
  'staking-dynamic': '/staking/dynamic',
  affiliate: '/affiliate',
  'affiliate-linear-tree': '/affiliate/linear',
  'affiliate-binary-tree': '/affiliate/binary',
  roulette: '/games/roulette/live',
  'roulette-single': '/games/roulette/single',
  'roulette-90': '/games/roulette/live/90',
  'roulette-180': '/games/roulette/live/180',
  predict: '/games/predict',
  luro: '/games/luro',
  stones: '/games/stones',
  'luro-5m': '/games/luro/5m',
  'luro-1d': '/games/luro/1d',
  lottery: '/games/lottery/lotto',
  statistics: '/statistics',
  academy: '/academy',
};

// @todo create sidebar component according to new design with availbility to move to components and reuse
// it means to NOT using Link from @tanstack/react-router, but instead provide direct links to the pages as children

const Sidebar = () => {
  const { data: manifest } = useContextManifest(mfQueryClient);
  if (!manifest) return null;

  return (
    <div className={cn('w-[250px] p-4 flex flex-col gap-2 bg-sidebar')}>
      {Object.keys(manifest.sidebar).map((section) => (
        <Link to={linkMapping[section]} key={section}>
          {section}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;

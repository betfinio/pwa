import { useState } from 'react';

function Switcher() {
  const [selected, setSelected] = useState<string>('betfin.io');
  return (
    <select
      className="bg-primary text-primary-foreground p-2 rounded-md border border-primary-foreground"
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      <option value="betfin.io">betfin.io</option>
      <option value="betfin.network">betfin.network</option>
      <option value="betfin.games">betfin.games</option>
      <option value="betfin.gg">betfin.gg</option>
    </select>
  );
}

export default Switcher;

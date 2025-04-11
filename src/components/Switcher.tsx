import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@betfinio/components/ui';
import { useEffect, useState } from 'react';
import { mfQueryClient } from '../config/query';
import { useProviders } from '../lib/query';

function Switcher() {
	const { data: urls = [] } = useProviders(mfQueryClient);
	const data = mfQueryClient.getQueryData<{ context: string }>(['contextManifest']);

	const [selected, setSelected] = useState<string>('betfin.io');

	useEffect(() => {
		if (!data) return;
		if (!urls.length) return;
		const initial = urls.find((provider) => data.context.includes(provider.key))?.key || 'betfin.io';
		setSelected(initial);
	}, [urls, data]);

	const handleChange = (value: string) => {
		setSelected(value);
		const provider = urls.find((provider) => provider.key === value);
		localStorage.setItem('context_manifest', provider?.url || urls[0].url);
		window.location.reload();
	};

	return (
		<Select defaultValue={selected} value={selected} onValueChange={handleChange}>
			<SelectTrigger className="max-w-[150px]">
				<SelectValue placeholder="Select a context" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{urls.map((provider) => (
						<SelectItem key={provider.key} value={provider.key}>
							{provider.key}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default Switcher;

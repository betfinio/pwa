import { Bet } from '@betfinio/components/icons';

function Loading() {
	return (
		<div className={'w-full h-screen flex items-center justify-center flex-col gap-4'}>
			<Bet className={'w-20 h-20 text-primary'} />
			Loading ...
		</div>
	);
}

export default Loading;

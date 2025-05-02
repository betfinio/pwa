import type { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';

const ERC20_TOKENS: Address[] = [
	'0xbF7970D56a150cD0b60BD08388A4A75a27777777',
	'0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
	'0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
];

function Balance() {
	return (
		<div className="flex flex-col gap-2 p-2">
			{ERC20_TOKENS.map((token) => (
				<SingleToken key={token} token={token} />
			))}
		</div>
	);
}

function SingleToken({ token }: { token: Address }) {
	const { address } = useAccount();
	const { data: info } = useBalance({ address: address, token: token, chainId: 137 });
	console.log(info);
	return (
		<div className="flex items-center gap-2 border border-border rounded-xl p-2 px-4 justify-between">
			<div>{info?.symbol}</div>
			<div className="flex flex-row gap-1 items-center">
				{info?.formatted} {info?.symbol}
			</div>
		</div>
	);
}

export default Balance;

import { useAccount } from 'wagmi';

function TestComponent() {
	const { address } = useAccount();
	return <div>TestComponent {address}</div>;
}

export default TestComponent;

function parseGwei(value) {
	return (Number(value) / 10 ** 18).toFixed(2);
}

function truncateAddress(address) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

import { useImportWallet, usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import logger from '../config/logger';

function ImportWalletButton() {
	const { ready, authenticated } = usePrivy();
	const { importWallet } = useImportWallet();
	const [privateKey, setPrivateKey] = useState('');

	const handleImport = async () => {
		logger.log('Importing wallet with private key:', privateKey);
		try {
			const wallet = await importWallet({ privateKey: privateKey });
			logger.log('Wallet imported successfully:', wallet);
		} catch (error) {
			logger.error('Failed to import wallet:', error);
		}
	};

	// Check that your user is authenticated
	const isAuthenticated = ready && authenticated;

	return (
		<div>
			<input type="text" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} placeholder="Enter your private key" />
			<button onClick={handleImport} type="button" disabled={!isAuthenticated}>
				Import my wallet
			</button>
		</div>
	);
}

export default ImportWalletButton;

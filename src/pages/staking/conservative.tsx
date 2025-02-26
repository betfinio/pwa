import { ConservativeStakingPage } from 'betfinio_staking/conservative';
import i18n from 'betfinio_staking/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import 'betfinio_staking/style';
import { useEffect } from 'react';

function ConservativePage() {
	const { i18n: sharedI18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(sharedI18n.language);
	}, [sharedI18n.language]);
	return (
		<I18nextProvider i18n={i18n}>
			<ConservativeStakingPage />
		</I18nextProvider>
	);
}

export default ConservativePage;

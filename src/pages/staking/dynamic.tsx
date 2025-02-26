import { DynamicStakingPage } from 'betfinio_staking/dynamic';
import i18n from 'betfinio_staking/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import 'betfinio_staking/style';
import { useEffect } from 'react';

function DynamicPage() {
	const { i18n: sharedI18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(sharedI18n.language);
	}, [sharedI18n.language]);
	return (
		<I18nextProvider i18n={i18n}>
			<DynamicStakingPage />
		</I18nextProvider>
	);
}

export default DynamicPage;

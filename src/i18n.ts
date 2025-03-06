import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const instance = i18n.createInstance().use(initReactI18next);

instance.init({
  resources: {
    shared: {
      translation: {
        shared: 'shared',
      },
    },
  },
  supportedLngs: ['en', 'ru', 'cs', 'es'],
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default instance;
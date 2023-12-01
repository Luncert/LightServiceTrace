import i18next from 'i18next';
import en from './en';
import zh from './zh';

export default function initI18n(lang: string) {
  i18next.init({
    lng: lang,
    debug: true,
    resources: {
      en: {
        translation: en
      },
      zh: {
        translation: zh
      }
    }
  });
}

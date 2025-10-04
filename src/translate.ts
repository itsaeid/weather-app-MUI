import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      login_title: 'Login',
      enter_name: 'Enter Your Name',
      login_button: 'Login',
      logout_button: 'Logout',
      dashboard_title: 'Dashboard',
      welcome: 'Welcome, {{name}}',
      copy_right: 'All rights of this site are reserved for Nadin Sadr Aria Engineering Company.',
      refresh: 'Update',
      logo_name: 'Weather Dashboard',
      temp_chart_title: 'Average Monthly Temperature',
      language: "Language",
      mode: "Mode",
      Dark: "Dark",
      Light: "Light",
      forcast: "2 weeks Forecast",
      form_placeholder: "Enter Your Name"
      
    },
  },
  fa: {
    translation: {
      login_title: 'ورود',
      enter_name: 'نام خود را وارد کنید',
      login_button: 'ورود',
      logout_button: 'خروج',
      dashboard_title: 'داشبورد',
      welcome: 'خوش آمدی، {{name}}',
      copy_right: 'همه حقوق این سایت برای شرکت مهندسی نادین صدر آریا محفوظ است.',
      refresh: 'به‌روزرسانی',
      logo_name: 'داشبورد آب  و هوا',
      temp_chart_title: 'میانگین دمای ماهانه',
      language: "زبان",
      mode: "حالت",
      Dark: "تاریک",
      Light: "روشن",
      forcast: "پیش‌بینی 2 هفته‌ای هوا",
      form_placeholder: "نام خود را وارد کنید",
      
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
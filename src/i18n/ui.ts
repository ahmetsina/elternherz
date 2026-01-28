import de from './de.json';
import tr from './tr.json';

export const languages = {
  de: 'Deutsch',
  tr: 'Türkçe',
};

export const defaultLang = 'de';

export const ui = {
  de,
  tr,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }
}

export function getLocalizedPath(path: string, locale: keyof typeof ui): string {
  if (locale === defaultLang) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

export function removeLocaleFromPath(path: string): string {
  const [, maybeLang, ...rest] = path.split('/');
  
  if (maybeLang in ui) {
    return '/' + rest.join('/');
  }
  
  return path;
}

// Map route names between languages
export const routeTranslations = {
  de: {
    'contact': 'kontakt',
    'services': 'leistungen',
    'blog': 'blog',
    'home': '',
  },
  tr: {
    'contact': 'iletisim',
    'services': 'hizmetler',
    'blog': 'blog',
    'home': '',
  },
};

export function getRouteForLocale(routeName: string, locale: keyof typeof ui): string {
  const routes = routeTranslations[locale];
  const translatedRoute = routes[routeName as keyof typeof routes];
  
  if (locale === defaultLang) {
    return translatedRoute ? `/${translatedRoute}` : '/';
  }
  
  return translatedRoute ? `/${locale}/${translatedRoute}` : `/${locale}`;
}

// Get alternate locale for current page
export function getAlternateLocale(currentLocale: keyof typeof ui): keyof typeof ui {
  return currentLocale === 'de' ? 'tr' : 'de';
}

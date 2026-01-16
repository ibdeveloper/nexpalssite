import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: [
    'ro', 'en', 'fr', 'de', 'it', 'es', 'pt', 'pl', 'nl', 'bg', 'cs', 'da',
    'et', 'fi', 'ga', 'el', 'hr', 'lv', 'lt', 'mt', 'hu', 'sk', 'sl', 'sv'
  ],
  defaultLocale: 'ro',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

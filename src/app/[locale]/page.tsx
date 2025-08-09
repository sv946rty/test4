import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

/**
 * Home page with internationalized content
 * All text content comes from translation files
 */
export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with theme toggle and language switcher */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <h1 className="text-xl font-semibold">{t('navigation.title')}</h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Welcome heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                {t('features.tailwind.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('features.tailwind.description')}
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                {t('features.shadcn.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('features.shadcn.description')}
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">
                {t('features.darkMode.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('features.darkMode.description')}
              </p>
            </div>
          </div>

          {/* Primary button demonstration */}
          <div className="space-y-4 mt-12">
            <h2 className="text-2xl font-semibold">{t('demo.primaryTitle')}</h2>
            <p className="text-muted-foreground">
              {t('demo.primaryDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-3">
                {t('demo.getStarted')}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                {t('demo.learnMore')}
              </Button>
            </div>
          </div>

          {/* Additional button variants */}
          <div className="space-y-4 mt-12">
            <h2 className="text-2xl font-semibold">
              {t('demo.buttonVariants')}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="default">{t('buttons.primary')}</Button>
              <Button variant="secondary">{t('buttons.secondary')}</Button>
              <Button variant="outline">{t('buttons.outline')}</Button>
              <Button variant="ghost">{t('buttons.ghost')}</Button>
              <Button variant="link">{t('buttons.link')}</Button>
              <Button variant="destructive">{t('buttons.destructive')}</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-16">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>{t('footer.text')}</p>
        </div>
      </footer>
    </div>
  );
}

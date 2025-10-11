import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

function App() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsLoading(false);
    } else {
      i18n.on('initialized', () => {
        setIsLoading(false);
      });
    }
  }, [i18n]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t('login.title')}</h1>
      <div className="space-x-2">
        <button onClick={() => i18n.changeLanguage('en')}>
          English
        </button>
        <button onClick={() => i18n.changeLanguage('fr')}>
          France
        </button>
        <button onClick={() => i18n.changeLanguage('hi')}>
          Hindi
        </button>
      </div>
    </div>
  )
}

export default App
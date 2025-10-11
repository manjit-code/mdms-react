import { useTranslation } from "react-i18next"

function App() {
  const {t, i18n} = useTranslation();
  console.log(t('login.title'));
  return (
    <div>
      <h1>{t('login.title')}</h1>
      <div>
        <button onClick={() => i18n.changeLanguage('en')}>English</button>
        <button onClick={() => i18n.changeLanguage('fr')}>France</button>
        <button onClick={() => i18n.changeLanguage('hi')}>Hindi</button>
      </div>
    </div>
  )
}

export default App
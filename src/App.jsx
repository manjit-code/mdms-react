import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore } from "./redux/store";


import RouterSetup from "./router/RouterSetup";
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
    <div className="overflow-hidden h-screen">
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
            <RouterSetup/>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
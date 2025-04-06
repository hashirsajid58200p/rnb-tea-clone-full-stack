import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MobileAppPage from "./MobileAppPage.jsx"

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <MobileAppPage/>
  </>,
)

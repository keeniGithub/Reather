import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      reverseOrder={true}
      toastOptions={{
        style: {
          color: 'black',
          background: 'white',
          fontSize: '15px',
          borderRadius: '5px',
          padding: '7px',
          paddingRight: '20px',
          paddingLeft: '20px',
        },
        iconTheme: {
          primary: 'black',
          secondary: 'white',
        },
      }}
    />
    <App />
  </StrictMode>,
)

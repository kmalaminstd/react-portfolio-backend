import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/auth.context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    
  </React.StrictMode>,
)
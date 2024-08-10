import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';   // zUygulamanızın ana bileşeni
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS dosyasını dahil et

// `document.getElementById('root')` ifadesi, HTML dosyanızdaki <div id="root"></div> elemanını hedef alır
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> {/* Ana uygulama bileşeni */}
  </React.StrictMode>
);


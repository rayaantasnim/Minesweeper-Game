import React, { useEffect } from 'react';
import GatewayPage from './pages/GatewayPage.jsx';

export default function App() {
  useEffect(() => {
    // If mounted on root, redirect to static games gateway
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
      if (!window.location.pathname.includes('/src/games/minesweeper-lite/')) {
        window.location.replace('/src/games/minesweeper-lite/index.html');
      }
    }
  }, []);

  return <GatewayPage />;
}

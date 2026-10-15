import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/styles.css';

import GatewayPage from './pages/GatewayPage.jsx';
import PlayPage from './pages/PlayPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

function renderApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  // Determine active view by data-page attribute or URL pathname
  const dataPage = rootElement.getAttribute('data-page');
  const path = window.location.pathname.toLowerCase();

  let Component = GatewayPage;

  if (dataPage === 'play' || path.endsWith('/play.html') || path.endsWith('play')) {
    Component = PlayPage;
  } else if (dataPage === 'results' || path.endsWith('/results.html') || path.endsWith('results')) {
    Component = ResultsPage;
  } else if (dataPage === 'faq' || path.endsWith('/faq.html') || path.endsWith('faq')) {
    Component = FaqPage;
  } else if (dataPage === 'about' || path.endsWith('/about.html') || path.endsWith('about')) {
    Component = AboutPage;
  } else {
    Component = GatewayPage;
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

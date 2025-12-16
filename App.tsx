import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Architecture } from './components/Architecture';
import { Search } from './components/Search';
import { ApiPlayground } from './components/ApiPlayground';
import { Analytics } from './pages/Analytics';
import { UserHistory } from './pages/History';
import { GetStarted } from './components/GetStarted';
import { AiAssistant } from './components/AiAssistant';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/search" element={<Search />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/history" element={<UserHistory />} />
          <Route path="/api" element={<ApiPlayground />} />
        </Routes>
        <AiAssistant />
      </Layout>
    </HashRouter>
  );
}

export default App;

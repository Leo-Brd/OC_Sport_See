import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import UserGreeting from './components/userGreeting/UserGreeting';
import DailyActivityChart from './components/dashboard/dailyActivityChart/DailyActivityChart';
import UserKeyData from './components/dashboard/userKeyData/UserKeyData';
import AverageSessionChart from './components/dashboard/averageSessionChart/AverageSessionChart';
import PerformanceChart from './components/dashboard/performanceChart/PerformanceChart';
import ScoreChart from './components/dashboard/scoreChart/ScoreChart';
import { useDashboardData } from './hooks/useDashboardData';
import { useMemo } from 'react';
import ErrorUser from './components/ErrorUser';

function getUserIdFromUrl() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  if (params.has('userId')) return params.get('userId');
  const match = window.location.pathname.match(/user\/(\d+)/);
  if (match) return match[1];
  return null;
}

function App() {
  const userId = useMemo(() => getUserIdFromUrl(), []);
  const { userInfo, activitySessions, averageSessions, performanceData } = useDashboardData(userId);

  // Affiche le composant d'erreur si aucun userId ou userInfo n'est trouvé
  if (!userId || !userInfo) {
    return (
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar />
          <main>
            <ErrorUser />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <main>
          <UserGreeting firstName={userInfo.firstName} />

          <div className='dashboard'>
            <div className='dashboard-left'>
              {activitySessions && (
                <DailyActivityChart sessions={activitySessions} />
              )}
              <div className="dashboard-charts-row">
                <div>
                  {averageSessions && (
                    <AverageSessionChart sessions={averageSessions} />
                  )}
                </div>
                <div>
                  {performanceData && (
                    <PerformanceChart data={performanceData} />
                  )}
                </div>
                <div>
                  <ScoreChart score={userInfo.score} />
                </div>
              </div>
            </div>
            <div className='dashboard-right'>
              <UserKeyData keyData={userInfo.keyData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App

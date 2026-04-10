import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useUserData } from './hooks/useUserData';
import UserGreeting from './components/userGreeting/UserGreeting';
import DailyActivityChart from './components/dashboard/dailyActivityChart/DailyActivityChart';
import UserKeyData from './components/dashboard/userKeyData/UserKeyData';
import AverageSessionChart from './components/dashboard/averageSessionChart/AverageSessionChart';
import PerformanceChart from './components/dashboard/performanceChart/PerformanceChart';
import ScoreChart from './components/dashboard/scoreChart/ScoreChart';
import { useMemo } from 'react';


function getUserIdFromUrl() {
  // Search for a userId parameter in the URL (ex: ?userId=12 or /user/12)
  const search = window.location.search;
  const params = new URLSearchParams(search);
  if (params.has('userId')) return params.get('userId');
  const match = window.location.pathname.match(/user\/(\d+)/);
  if (match) return match[1];
  return null;
}

function App() {
  const userId = useMemo(() => getUserIdFromUrl(), []);
  const { data: userData } = useUserData(userId, '');
  const { data: activityData } = useUserData(userId, '/activity');
  const { data: performanceData } = useUserData(userId, '/performance');
  const { data: averageSessionData } = useUserData(userId, '/average-sessions');

  if (userData) console.log('User data:', userData);
  if (activityData) console.log('Daily activity:', activityData);
  if (performanceData) console.log('Performance:', performanceData);
  if (averageSessionData) console.log('Average session data:', averageSessionData);

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <main>
          {userData && userData.data && (
            <UserGreeting firstName={userData.data.userInfos.firstName} />
          )}

          <div className='dashboard'>
            <div className='dashboard-left'>
              {activityData && activityData.data && (
                 <DailyActivityChart sessions={activityData.data.sessions} />
              )}
              <div className="dashboard-charts-row">
                <div>{averageSessionData && averageSessionData.data && (
                  <AverageSessionChart sessions={averageSessionData.data.sessions} />
                )}</div>
                <div>{/* Graphique 2 ici */}
                  {performanceData && performanceData.data && (
                    <PerformanceChart performance={performanceData.data} />
                  )}
                </div>
                <div>
                  {userData && userData.data && (
                    <ScoreChart score={userData.data.score ?? userData.data.todayScore} />
                  )}
                </div>
              </div>
            </div>
            <div className='dashboard-right'>
              {userData && userData.data && (
                <UserKeyData keyData={userData.data.keyData} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

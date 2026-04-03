import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useUserData } from './hooks/useUserData';
import UserGreeting from './components/userGreeting/UserGreeting';
import DailyActivityChart from './components/dashboard/dailyActivityChart/DailyActivityChart';


function App() {
  const userId = import.meta.env.VITE_USER_ID;
  const { data: userData } = useUserData(userId, '');
  const { data: activityData } = useUserData(userId, '/activity');
  const { data: performanceData } = useUserData(userId, '/performance');

  if (userData) console.log('Données utilisateur:', userData);
  if (activityData) console.log('Activité quotidienne:', activityData);
  if (performanceData) console.log('Performance:', performanceData);

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
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useUserData } from './hooks/useUserData';


function App() {
  const { data: userData } = useUserData(12, '');
  const { data: activityData } = useUserData(12, '/activity');
  const { data: performanceData } = useUserData(12, '/performance');

  if (userData) console.log('Données utilisateur:', userData);
  if (activityData) console.log('Activité quotidienne:', activityData);
  if (performanceData) console.log('Performance:', performanceData);

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main style={{ marginLeft: 100, padding: 40 }}>

      </main>
    </div>
  )
}

export default App

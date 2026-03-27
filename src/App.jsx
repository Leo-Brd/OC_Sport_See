import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useUser } from './hooks/useUser';

function App() {
  const { data, loading, error } = useUser(12);

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main style={{ marginLeft: 100, padding: 40 }}>
        {loading && <p>Chargement...</p>}
        {error && <p>Erreur : {error.message}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </main>
    </div>
  )
}

export default App

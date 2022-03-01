import './App.css'
import { ArticlesProvider } from './context/ArticlesContext';
import { Home } from './pages/Home';

function App() {

  return (
    <div className="App">
      <ArticlesProvider>
        <Home />
      </ArticlesProvider>
    </div>
  )
}

export default App

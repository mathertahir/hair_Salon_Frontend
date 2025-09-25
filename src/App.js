
import { BrowserRouter } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import ScrollToTop from './components/ScrollToTop';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <UserRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;


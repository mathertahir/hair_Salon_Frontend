import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layouts/Layout.jsx';
import UserRoutes from './routes/UserRoutes';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Layout>
          <UserRoutes />
        </Layout>
      </BrowserRouter>
    </div >
  );
}

export default App;

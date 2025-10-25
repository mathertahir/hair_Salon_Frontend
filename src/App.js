// import { BrowserRouter } from 'react-router-dom';
// import UserRoutes from './routes/UserRoutes';
// import ScrollToTop from './components/ScrollToTop';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <ScrollToTop />
//         <UserRoutes />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import UserRoutes from "./routes/UserRoutes";
import { ThemeProvider } from "./components/theme-provider";
import { ToastContainerWrapper } from "./utils/ToastService";
import { AuthProvider } from "./services/context/AuthContext";


function App() {
  return (
    <>

      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <UserRoutes />
        </AuthProvider>
      </ThemeProvider>
      <ToastContainerWrapper />

    </>
  );
}

export default App;

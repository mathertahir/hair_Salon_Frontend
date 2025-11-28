import UserRoutes from "./routes/UserRoutes";
import { ThemeProvider } from "./components/theme-provider";
import { ToastContainerWrapper } from "./utils/ToastService";
import { AuthProvider } from "./services/context/AuthContext";
import GoogleTranslate from "./components/GoogleTranslate";
import useCoiffeurReplacement from "./utils/helpers/HelperFunction";

function App() {
  useCoiffeurReplacement();
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

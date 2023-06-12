import './App.css';
import { GlobalChooseProvider, GlobalDataProvider, GlobalDatahomeimgProvider } from './global';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './router/router';
const routes = createBrowserRouter(ROUTES)
function App() {
  return (
    <GlobalChooseProvider>
      <GlobalDatahomeimgProvider>
        <GlobalDataProvider>
          <RouterProvider router={routes} />
        </GlobalDataProvider>
      </GlobalDatahomeimgProvider>
    </GlobalChooseProvider>
  );
}

export default App;

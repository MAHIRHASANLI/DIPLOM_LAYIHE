import './App.css';
import { GlobalChooseProvider, GlobalDataProvider, GlobalDatahomeimgProvider, GlobalTeamProvider } from './global';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './router/router';
const routes = createBrowserRouter(ROUTES)
function App() {
  return (
    <GlobalTeamProvider>
        <GlobalChooseProvider>
          <GlobalDatahomeimgProvider>
            <GlobalDataProvider>
              <RouterProvider router={routes} />
            </GlobalDataProvider>
          </GlobalDatahomeimgProvider>
        </GlobalChooseProvider>
    </GlobalTeamProvider>
  );
}

export default App;

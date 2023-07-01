import './App.css';
import { GlobalBlogProvider, GlobalChooseProvider, GlobalDataProvider,  GlobalPassionProvider, GlobalTeamProvider, UserContextProvider } from './global';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from './router/router';
const routes = createBrowserRouter(ROUTES)
function App() {
  return (
    <UserContextProvider>
    <GlobalBlogProvider>
      <GlobalTeamProvider>
        <GlobalChooseProvider>
          <GlobalPassionProvider>
            <GlobalDataProvider>
              <RouterProvider router={routes}/>
            </GlobalDataProvider>
            </GlobalPassionProvider>
        </GlobalChooseProvider>
      </GlobalTeamProvider>
    </GlobalBlogProvider>
    </UserContextProvider>
  );
}

export default App;

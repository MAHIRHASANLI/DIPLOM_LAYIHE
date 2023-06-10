import './App.css';
import { GlobalDataProvider } from './global';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './router/router';
const routes = createBrowserRouter(ROUTES)
// import { GlobalDataProvider } from './global'
function App() {
  return (
    <GlobalDataProvider>
      <RouterProvider router={routes} />
    </GlobalDataProvider>
  );
}

export default App;

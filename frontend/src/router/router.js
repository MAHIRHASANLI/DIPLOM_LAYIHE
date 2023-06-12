import AboutAdmin from "../pages/Admin/AboutAdmin";
import ChooseAdmin from "../pages/Admin/AboutAdmin/ChooseAdmin";
import AdminRoot from "../pages/Admin/AdminRoot";
import BlogAdmin from "../pages/Admin/BlogAdmin";
import ContactAdmin from "../pages/Admin/ContactAdmin";
import Dashboard from "../pages/Admin/Deshboard";
import GaleryAdmin from "../pages/Admin/GaleryAdmin";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import AddSlider from "../pages/Admin/HomeAdmin/addSlider";
import About from "../pages/User/About";
import Blog from "../pages/User/Blog";
import Contact from "../pages/User/Contact";
import Galery from "../pages/User/Galery";
import Home from "../pages/User/Home";
import MainRoot from "../pages/User/MainRoot";

export const ROUTES = [
    {
        path: "/",
        element: <MainRoot />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'galery',
                element: <Galery />
            },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'contact',
                element: <Contact />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'home',
                element: <HomeAdmin />
            },
            {
                path: 'choose',
                element: <ChooseAdmin/>
            },
            {
                path: 'about',
                element: <AboutAdmin />
            },
            {
                path: 'galery',
                element: <GaleryAdmin />
            },
            {
                path: 'blog',
                element: <BlogAdmin />
            },
            {
                path: 'contact',
                element: <ContactAdmin />
            },
            {
                path: 'addSlider',
                element: <AddSlider/>
            }
        ]
    }
]
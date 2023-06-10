import AboutAdmin from "../pages/Admin/AboutAdmin";
import AdminRoot from "../pages/Admin/AdminRoot";
import BlogAdmin from "../pages/Admin/BlogAdmin";
import ContactAdmin from "../pages/Admin/ContactAdmin";
import GaleryAdmin from "../pages/Admin/GaleryAdmin";
import HomeAdmin from "../pages/Admin/HomeAdmin";
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
                element: <HomeAdmin />
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
            }
        ]
    }
]
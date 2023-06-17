import AboutAdmin from "../pages/Admin/AboutAdmin/home";
import ChooseAdmin from "../pages/Admin/AboutAdmin/ChooseAdmin/home";
import AdminRoot from "../pages/Admin/AdminRoot";
import BlogAdmin from "../pages/Admin/BlogAdmin";
import ContactAdmin from "../pages/Admin/ContactAdmin";
import Dashboard from "../pages/Admin/Deshboard";
import GaleryAdmin from "../pages/Admin/GaleryAdmin";
 import About from "../pages/User/About";
import Blog from "../pages/User/Blog";
import Contact from "../pages/User/Contact";
import Galery from "../pages/User/Galery";
import Home from "../pages/User/Home";
import MainRoot from "../pages/User/MainRoot";
import OurTeam from "../pages/Admin/AboutAdmin/ourTeam/home";
import HomeAdmin from "../pages/Admin/HomeAdmin/home";
import AdSlider from "../pages/Admin/HomeAdmin/add";
import DetailSlider from "../pages/Admin/HomeAdmin/detail";
import AddChoose from "../pages/Admin/AboutAdmin/ChooseAdmin/add";
import DetailChoose from "../pages/Admin/AboutAdmin/ChooseAdmin/detail";
import FooterAdmin from "../pages/Admin/Footer/home";
import AdFooter from "../pages/Admin/Footer/add";
import AddTeam from "../pages/Admin/AboutAdmin/ourTeam/add";
import DetailOurTeam from "../pages/Admin/AboutAdmin/ourTeam/detail";
import Passion from "../pages/Admin/AboutAdmin/forPassion/home";
import DetailPassion from "../pages/Admin/AboutAdmin/forPassion/detail";

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
                element: <HomeAdmin/>
            },
            {
                path: 'adslider',
                element: <AdSlider/>
            },
            {
                path: 'detailslider/:id',
                element: <DetailSlider/>
            },
            {
                path: 'passion',
                element: <Passion/>
            },
            {
                path: 'detailpassion/:id',
                element: <DetailPassion/>
            },
            {
                path: 'about',
                element: <AboutAdmin />
            },
            {
                path: 'choose',
                element: <ChooseAdmin/>
            },
            {
                path: 'adchoose',
                element: <AddChoose/>
            },
            {
                path: 'detailchoose/:id',
                element: <DetailChoose/>
            },
            {
                path: 'team',
                element: <OurTeam/>
            },
            {
                path: 'adteam',
                element: <AddTeam/>
            },
            {
                path: 'detailteam/:id',
                element: <DetailOurTeam/>
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
                path: 'footer',
                element: <FooterAdmin/>
            },
            {
                path: 'adfooter',
                element: <AdFooter/>
            }
        ]
    }
]
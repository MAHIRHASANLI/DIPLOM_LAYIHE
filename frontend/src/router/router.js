import LoginRoot from "../pages/Login/LoginRoot";
import AboutAdmin from "../pages/Admin/AboutAdmin/home.about.image/home";
import ChooseAdmin from "../pages/Admin/AboutAdmin/ChooseAdmin/home";
import AdminRoot from "../pages/Admin/AdminRoot";
import BlogAdmin from "../pages/Admin/BlogAdmin/home";
import ContactAdmin from "../pages/Admin/ContactAdmin/home";
import GaleryAdmin from "../pages/Admin/GaleryAdmin/home";
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
import AddTeam from "../pages/Admin/AboutAdmin/ourTeam/add";
import DetailOurTeam from "../pages/Admin/AboutAdmin/ourTeam/detail";
import Passion from "../pages/Admin/AboutAdmin/forPassion/home";
import DetailPassion from "../pages/Admin/AboutAdmin/forPassion/detail";
import DetailBlog from "../pages/Admin/BlogAdmin/detail";
import AddBlog from "../pages/Admin/BlogAdmin/add";
import AdGallery from "../pages/Admin/GaleryAdmin/add";
import FolloInstagramAdmin from "../pages/Admin/followerinstagram/home";
import AddFollower from "../pages/Admin/followerinstagram/add";
import RegisterAdmin from "../pages/Admin/Dashboard";
import AdminLogin from "../pages/Login/LoginAdmin";
import LoginUser from "../pages/Login/Users/UsersLogin";
import Faworites from "../pages/User/Faworites";

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
            },
            {
                path: 'fawori',
                element: <Faworites/>
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminRoot />,
        children: [
            {
                path: '',
                element: <RegisterAdmin />
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
                path: 'blog',
                element: <BlogAdmin />
            },
            {
                path: 'adblog',
                element: <AddBlog />
            },
            {
                path: 'detailblog/:id',
                element: <DetailBlog />
            },
            {
                path: 'contact',
                element: <ContactAdmin />
            },
            {
                path: 'galery',
                element: <GaleryAdmin />
            },
            {
                path: 'adgallery',
                element: <AdGallery/>
            },
            {
                path: 'footer',
                element: <FooterAdmin/>
            },
            {
                path: 'follower',
                element: <FolloInstagramAdmin/>
            },
            {
                path: 'adfollower',
                element: <AddFollower/>
            }
        ]
    },
    {
        path:"/login",
        element:<LoginRoot/>,
        children:[
            {
                path:"",
                element:<AdminLogin/>
            },
            {
                path:"user",
                element:<LoginUser/>
            }
        ]
    }
]
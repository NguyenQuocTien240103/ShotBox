import Main from '../pages/Main'
import LoginSignup from '../pages/LoginSignup'
import Album from '../pages/Album'
import Home from '../pages/Home'
import Images from '../pages/Images'
import User from '../pages/User'
import Webcam from '../pages/Webcam'

const routes = [
    {
        path: '/',
        component: Main,
        layout: 'MainLayout'
    },
    {
        path: '/login',
        component: LoginSignup,
        layout: null
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/webcam',
        component: Webcam,
    },
    {
        path: '/images',
        component: Images,
    },
    {
        path: '/album',
        component: Album,
    },
    {
        path: '/user',
        component: User,
    },

]
export default routes
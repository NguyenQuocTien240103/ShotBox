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
        layout: 'MainLayout',
        isPrivate: false 
    },
    {
        path: '/login',
        component: LoginSignup,
        layout: null,
        isPrivate: false 
    },
    {
        path: '/home',
        component: Home,
        isPrivate: true 
    },
    {
        path: '/webcam',
        component: Webcam,
        isPrivate: true 

    },
    {
        path: '/images',
        component: Images,
        isPrivate: true 

    },
    {
        path: '/album',
        component: Album,
        isPrivate: true 

    },
    {
        path: '/user',
        component: User,
        isPrivate: true 
    },

]
export default routes
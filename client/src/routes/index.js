import Main from '../pages/Main'
import Account from '../pages/Account'
import Album from '../pages/Album'
import Discover from '../pages/Discover'
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
        path: '/account',
        component: Account,
        layout: null
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/discover',
        component: Discover,
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
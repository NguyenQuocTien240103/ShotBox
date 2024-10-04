import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import classnames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
const cx = classnames.bind(styles)

function DefaultLayout({ children }) {
    return (<div className={cx('wrapper')}>
        <Navbar defaultLayout href='/home' />
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('block')}>
                <div className={cx('main-content')}>
                    {children}
                </div>
            </div>
        </div>

        <div className={cx('upload-container')} >
            <div className={cx('upload')}>

            </div>
        </div>
    </div>);
}

export default DefaultLayout;
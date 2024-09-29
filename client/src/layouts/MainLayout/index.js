import Navbar from '../../components/Navbar'
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss'
const cx = classNames.bind(styles)
function MainLayout({ children }) {
    return (<div className={cx('wrapper')}>
        <Navbar login href='/'>
            <h1 className={cx('title')}>The beautiful memories – captured in every photo</h1>
        </Navbar>
        {children}
    </div>);
}

export default MainLayout;
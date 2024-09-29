import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'
import Button from '../Button'
const cx = classNames.bind(styles)
function Sidebar() {
    return <div className={cx('wrapper')}>
        <Button third to='/webcam'>Webcam</Button>
        <Button third to='/images'>Images</Button>
        <Button third to='/album'>Album</Button>
    </div>
}
export default Sidebar;
import styles from './Webcam.module.scss'
import classNames from 'classnames/bind'
import Camera from '../../components/Camera'
const cx = classNames.bind(styles)
function Webcam() {

    return (<div className={cx('wrapper')}>
        <h2 className={cx('title')}>My Camera</h2>
        <Camera />
    </div>);
}

export default Webcam;
import { useState } from 'react'
import styles from './Webcam.module.scss'
import classNames from 'classnames/bind'
import Camera from '../../components/Camera'
import Button from '../../components/Button'
const cx = classNames.bind(styles)
function Webcam() {
    const [capturedImage, setCapturedImage] = useState(null);
    return (<div className={cx('wrapper')}>
        <h2 className={cx('title')}>My Camera</h2>
        {!capturedImage && <Camera
            setCapturedImage={setCapturedImage}
        />}
        {capturedImage && <div className={cx('demo')}>
            <img src={capturedImage} className={cx('demo1')} />

        </div>}
        {capturedImage &&
            <div className={cx('demo3')}>
                <Button first
                    onClick={() => {
                        setCapturedImage(null)
                    }}
                >
                    Back
                </Button>
                <Button first
                    onClick={() => {
                        setCapturedImage(null)
                    }}
                >
                    Add To Images
                </Button>
                <Button first
                    onClick={() => {
                        setCapturedImage(null)
                    }}
                >
                    Download
                </Button>
            </div>
        }


    </div>);
}

export default Webcam;
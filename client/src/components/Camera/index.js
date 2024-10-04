import Webcam from 'react-webcam'
import styles from './Camera.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button'
import { useState } from 'react'
const cx = classNames.bind(styles)
function Camera() {
    const [showCamera, setShowCamera] = useState(false)
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    return (<div className={cx('wrapper')} >
        {showCamera &&
            <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
                {({ getScreenshot }) => (
                    <div className={cx('action-get-img')}>
                        <Button
                            first
                            onClick={() => {
                                const imageSrc = getScreenshot({ width: 1920, height: 1080 })
                            }}
                        >
                            Take a photo
                        </Button>

                    </div>
                )}
            </Webcam>
        }

        <div className={cx('action')}>
            <Button first onClick={() => { setShowCamera(!showCamera) }}>{showCamera ? 'Hide Camera' : 'Show Camera'}</Button>
        </div>
    </div >);
}

export default Camera;
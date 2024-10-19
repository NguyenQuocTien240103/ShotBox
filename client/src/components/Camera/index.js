import { useState } from 'react'
import Webcam from 'react-webcam'
import classNames from 'classnames/bind'
import styles from './Camera.module.scss'
import Button from '../Button'
const cx = classNames.bind(styles)
function Camera({ setCapturedImage }) {

    const videoConstraints = {
        width: 1080,
        height: 490,
        facingMode: "user"
    };

    return (<div className={cx('wrapper')} >
        {
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
                                const imageSrc = getScreenshot({ width: 700, height: 400 })
                                setCapturedImage(imageSrc);
                            }}
                        >
                            Take a photo
                        </Button>
                    </div>
                )}
            </Webcam>
        }

    </div >);
}

export default Camera;
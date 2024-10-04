import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss'
import Button from '../Button';
const cx = classNames.bind(styles)

function UpLoad({onClick}) {
    const fileInputRef = useRef(null);
    const handleSelectFromDevice = () => {
        fileInputRef.current.click();
    };
    return (<div className={cx('wrapper')}>
            <div className={cx('upload')}>
                <div className={cx('wrapper-button')}>
                  
                        <Button five>use-url</Button>
                        <Button five onClick={handleSelectFromDevice}>select-from-device</Button>
                  
                </div>
                <div className={cx('form')}>
                    <div className={cx('frame')}>
                            <input type="text" style={{width:'340px', fontSize: '14px', lineHeight:'2.0', height: '27px', outline: 'none' }} placeholder='Paste your URL here...' />
                            <Button five>UpLoad</Button>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                <i className={`fa-regular fa-circle-xmark ${cx('circle-xmark')}`} onClick={onClick}></i>
            </div>
    </div>);
}
export default UpLoad;
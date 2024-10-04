import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import classnames from 'classnames/bind'
import React, { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { hideUpload } from '../../actions/upload'
import styles from './DefaultLayout.module.scss'
import Button from '../../components/Button'
const cx = classnames.bind(styles)

function DefaultLayout({ children }) {
    const stateUpload = useSelector(state => state.upload.value)
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const handleOnclick = (e) =>{
        const action = hideUpload(false);
        dispatch(action);
    }
    const handleSelectFromDevice = () => {
        fileInputRef.current.click();
    };

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


        {/* form upload */}
    {stateUpload && 
        <div className={cx('upload-container')} >
            <div className={cx('upload')}>
                <Button five>use-url</Button>
                <Button five onClick={handleSelectFromDevice}>select-from-device</Button>
                <div className={cx('form')}>
                    <div className={cx('frame')}>
                            <input type="text" style={{ flex: 1, fontSize: '16px', height: '27px', outline: 'none' }} />
                            <Button five>upload</Button>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                <i className={`fa-regular fa-circle-xmark ${cx('circle-xmark')}`} onClick={handleOnclick}></i>
            </div>
        </div>

    }
    </div>);
}

export default DefaultLayout;
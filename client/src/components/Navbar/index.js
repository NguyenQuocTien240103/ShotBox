import styles from './Navbar.module.scss'
import classnames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Button from '../Button'
import React, { useRef } from 'react';
// import Input from '../Input'
import { useState } from 'react'
const cx = classnames.bind(styles)
function NavBar({ login, fixLogin, href, children }) {
    const [showMenuItems, setShowMenuItems] = useState(false)
    const fileInputRef = useRef(null);
    const handleSelectFromDevice = () => {
        fileInputRef.current.click();
    };
    const props = {
        to: href,
    }
    return <div className={cx('wrapper')}>
        <Link className={cx('logo')} {...props}></Link>
        {children}

        {login &&
            <div className={cx('actions')} >
                <Button first to='account'>Log In</Button>
            </div >
        }

        {fixLogin &&
            <div className={cx('fix-login')}>

                <div className={cx('actions')} >
                    <Button second >UPLOAD</Button>
                </div >

                <div className={cx('actions')} >
                    <Button icon={<i className="fa-regular fa-user"></i>}></Button>
                </div >

                <div className={cx('actions')} >
                    <Button to='/user'>NguyenQuocTien</Button>
                </div >

                <div className={cx('actions')} >
                    <Button icon={<i className="fa-solid fa-ellipsis-vertical"></i>} onClick={() => setShowMenuItems(!showMenuItems)}>
                        {showMenuItems &&
                            <div className={cx('menu-items')}>
                                <Button to='/user' four>Information</Button>
                                <Button to='/' four>Logout</Button>
                            </div>
                        }
                    </Button>
                </div >

                <div className={cx('upload')}>
                    <Button five>use-url</Button>
                    <Button five onClick={handleSelectFromDevice}>select-from-device</Button>
                    <div className={cx('upload-container')}>
                        <div className={cx('frame')}>
                            <input type="text" style={{ flex: 1, fontSize: '16px', height: '27px', outline: 'none' }} />
                            <Button five>upload</Button>
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                </div>


            </div>
        }


    </div >
}

export default NavBar;
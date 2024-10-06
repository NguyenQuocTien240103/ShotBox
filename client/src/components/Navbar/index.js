import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import classnames from 'classnames/bind'
import styles from './Navbar.module.scss'
import { showUpload } from '../../actions/upload'
import {authLogout} from '../../actions/auth'
import Button from '../Button'
const cx = classnames.bind(styles)
function NavBar({ mainLayout, defaultLayout, href, children }) {
    const [showMenuItems, setShowMenuItems] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnclick = (e) => {
        const action = showUpload(true);
        dispatch(action)
    }
    const handleOnlickLogout = (e) =>{
        localStorage.removeItem('authToken');
        dispatch(authLogout());
        navigate('/login')
    }

    const props = {
        to: href,
    }

    return <div className={cx('wrapper')}>
        <Link className={cx('logo')} {...props}></Link>

        {children}

        {mainLayout &&
            <div className={cx('actions')} >
                <Button first to='/login'>Log In</Button>
            </div >
        }

        {defaultLayout &&
            <div className={cx('fix-toolbar')}>
                <div className={cx('actions')} >
                    <Button second onClick={handleOnclick}>UPLOAD</Button>
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
                                <Button four onClick={handleOnlickLogout}>Logout</Button>
                            </div>
                        }
                    </Button>
                </div >

            </div>
        }

    </div >
}

export default NavBar;
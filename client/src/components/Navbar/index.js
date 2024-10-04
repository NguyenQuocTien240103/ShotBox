import { useState } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import Button from '../Button'
import { showUpload } from '../../actions/upload'
import styles from './Navbar.module.scss'
const cx = classnames.bind(styles)
function NavBar({ mainLayout, defaultLayout, href, children }) {
    const [showMenuItems, setShowMenuItems] = useState(false)

    const dispatch = useDispatch();

    const handleOnclick = (e)=>{
        const action = showUpload(true);
        dispatch(action)
    }

    const props = {
        to: href,
    }

    return <div className={cx('wrapper')}>
        <Link className={cx('logo')} {...props}></Link>

        {children}

        {mainLayout &&
            <div className={cx('actions')} >
                <Button first to='/account'>Log In</Button>
            </div >
        }

        {defaultLayout &&
            <div className={cx('fix-login')}>
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
                                <Button to='/' four>Logout</Button>
                            </div>
                        }
                    </Button>
                </div >

            </div>
        }

    </div >
}

export default NavBar;
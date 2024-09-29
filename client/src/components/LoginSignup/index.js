import { useState } from 'react'
import classNames from "classnames/bind";
import styles from './LoginSignup.module.scss'
import Input from "../Input";
const cx = classNames.bind(styles)
function LoginSigup() {
    // const [name, setName] = useState('');
    // const [erorName, setErrorName] = useState('');
    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value)
    }
    return (<div className={cx('wrapper')}>

        {/* <div className="block__intro">
            <div className="block__messege">WELCOME TO WEBSITE</div>
            <div className="block__description">
                <h1>
                    Dịch vụ cho phép lưu trữ quản lí ảnh
                </h1>
            </div> 
        </div>

        <div className="login-container">
            <div action="" method="GET" className={cx("login")}>

                <h2 className={cx("login-title")}>LOG IN</h2>
                <div className={cx('demo')}>
                    <Input className={cx("login-control")} id="username" name="username" type="text" placeholder="Username" />
                </div>

                <div className={cx('demo')}>
                    <Input className={cx("login-control")} id="username" name="username" type="password" placeholder="Password" />
                </div> */}


        {/* <i className="fa-solid fa-exclamation"></i> */}
        {/* <i className="fa-solid fa-exclamation"></i> */}
        {/* <div className={cx('demo')}>
                    <button type="submit" className={cx("btn-login")}>Log in</button>
                </div>
                <div className={cx("forgot")}>
                    <a href="">Forgot password?</a>
                </div>
                <button className={cx("btn-signup")}>Create new account</button>
            </div>

        </div> */}

        <div className={cx("signup-container")}>
            <form action="" className={cx("signup")} onSubmit={handleSubmit}>
                <i className={`fa-solid fa-xmark ${cx('xmark')}`}></i>
                <h2 className={cx("signup-title")}>CREATE AN ACCOUNT </h2>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="text" id="username" name="username" placeholder="Username" value={value.name} setValue={setValue} />
                    {/* <Input className={cx("signup-control")} type="text" id="username" name="username" placeholder="Username" error='Vui lòng nhập tên' /> */}
                </div>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="text" id="email" name="email" placeholder="Email" autoComplete="username" />
                    {/* <Input className={cx("signup-control")} type="text" id="email" name="email" placeholder="Email" error='Vui lòng nhập email' /> */}
                </div>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="password" id="password" name="password" placeholder="Password" autoComplete="new-password" />
                    {/* <Input className={cx("signup-control")} type="password" id="password" name="password" placeholder="Password" error='Vui lòng nhập mật khẩu' /> */}
                </div>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" autoComplete="new-password" />
                    {/* <Input className={cx("signup-control")} type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" error='Vui lòng nhập lại mật khẩu' /> */}
                </div>
                <button className={cx("signup-submit")}>Register</button>
            </form>
        </div>
    </div>);
}

export default LoginSigup;
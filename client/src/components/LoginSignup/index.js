import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames/bind";
import styles from './LoginSignup.module.scss'
import Input from "../Input";
const cx = classNames.bind(styles)
function LoginSigup() {

    const validationSchema = Yup.object({
        name: Yup.string()
          .required('Tên là bắt buộc')
          .min(2, 'Tên phải có ít nhất 2 ký tự'),
        email: Yup.string()
          .required('Email là bắt buộc')
          .email('Email không hợp lệ'),
        password: Yup.string()
          .required('Mật khẩu là bắt buộc')
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      });

    const formik = useFormik({
        initialValues:{
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: (value)=>{
            console.log(value)
        }
    })
    console.log(formik.setErrors)
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
            <form action="" className={cx("signup")} onSubmit={formik.handleSubmit}>
                <i className={`fa-solid fa-xmark ${cx('xmark')}`}></i>
                <h2 className={cx("signup-title")}>CREATE AN ACCOUNT </h2>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="text" id="username" name="username" placeholder="Username" value={formik.values.username} setValue={formik.handleChange} />
                    {/* <Input className={cx("signup-control")} type="text" id="username" name="username" placeholder="Username" error='Vui lòng nhập tên' /> */}
                </div>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="text" id="email" name="email" placeholder="Email" autoComplete="username" value={formik.values.email} setValue={formik.handleChange}/>
                    {/* <Input className={cx("signup-control")} type="text" id="email" name="email" placeholder="Email" error='Vui lòng nhập email' /> */}
                </div>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="password" id="password" name="password" placeholder="Password" autoComplete="new-password" value={formik.values.password} setValue={formik.handleChange}/>
                    {/* <Input className={cx("signup-control")} type="password" id="password" name="password" placeholder="Password" error='Vui lòng nhập mật khẩu' /> */}
                </div>
                <div className={cx('demo')}>
                    <Input className={cx("signup-control")} type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" autoComplete="new-password" value={formik.values.password_confirmation} setValue={formik.handleChange}/>
                    {/* <Input className={cx("signup-control")} type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" error='Vui lòng nhập lại mật khẩu' /> */}
                </div>
                <button className={cx("signup-submit")} type='submit'>Register</button>
            </form>
        </div>
    </div>);
}

export default LoginSigup;
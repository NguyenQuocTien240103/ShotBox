import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // option
import 'tippy.js/themes/light.css';
import styles from './LoginRegister.module.scss'
import Input from '../../components/Input';
import FormRegister from '../../components/FormRegister';
import { authLogin } from '../../redux/actions/auth'
import * as authService from '../../services/authService'

const cx = classNames.bind(styles)

function LoginRegister() {
    const [showFormRegister, setShowFormRegister] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Required')
            .min(5, 'Must be at least 5 characters'),
        password: Yup.string()
            .required('Required')
            .min(5, 'Must be at least 5 characters'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (value) => {
            const fetchApi = async () => {
                try {
                    const res = await authService.login(value);

                    if (res) {
                        dispatch(authLogin(res));
                    }
                }
                catch (error) {
                    setErrorLogin(error.response.data.message);
                }
            }
            fetchApi();
        }
    })

    const handleOnclick = (e) => {
        setShowFormRegister(true)
    }

    return (<div className={cx('wrapper')}>

        <div className="block__intro">
            <div className="block__messege">  
                <h1 style={{ color: 'white', textAlign: 'center' }}>WELCOME TO WEBSITE SHOTBOX</h1>
            </div>
            <div className={cx('block__description')}>
                <h1 style={{ color: 'black' }}>
                    Your memories, captured and secured — all in one place with ShotBox
                </h1>
            </div>
        </div>

        <div className="login-container">
            <form className={cx("login")} onSubmit={formik.handleSubmit}>

                <h2 className={cx("login-title")}>LOG IN</h2>
                {errorLogin &&
                    <p style={{ color: 'red' }}>{errorLogin}</p>
                }
                <div className={cx('group-control')}>
                    <Input className={cx("login-control")}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.username && formik.touched.username ?
                        <Tippy content={formik.errors.username} placement={'bottom'} >
                            <i className={`fa-solid fa-circle-exclamation ${cx('icon-modifier')}`}></i>
                        </Tippy> : null
                    }
                </div>

                <div className={cx('group-control')}>
                    <Input className={cx("login-control")}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ?
                        <Tippy content={formik.errors.password} placement={'bottom'}>
                            <i className={`fa-solid fa-circle-exclamation ${cx('icon-modifier')}`}></i>
                        </Tippy> : null
                    }
                </div>

                <div className={cx('group-control')}>
                    <button type="submit" className={cx("btn-login")}>Log in</button>
                </div>

                <div className={cx("forgot")}>
                    <Link to="./identify">Forgot password?</Link>
                </div>

                <button className={cx("btn-register")} type='button' onClick={handleOnclick}>Create new account</button>
            </form>
        </div>

        {showFormRegister &&
            <FormRegister setShowFormRegister={setShowFormRegister} />
        }

    </div>);
}

export default LoginRegister;
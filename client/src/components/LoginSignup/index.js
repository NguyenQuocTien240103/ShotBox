import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // option
import 'tippy.js/themes/light.css';
import styles from './LoginSignup.module.scss'
import {authLogin} from '../../actions/auth'
import Input from "../Input";
import Signup from '../Signup';
// import * as request from '../../utils/request'
// import * as demoService from '../../services/demoService'
const cx = classNames.bind(styles)
function LoginSigup() {
    const [showFormSignup, setShowFormSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Required')
            .min(5, 'Must be less 5 characters'),
        password: Yup.string()
            .required('Required')
            .min(5, 'Must be less 5 characters'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (value) => {
            console.log(value);
            if(value.username === 'tiennhi' && value.password === '123456'){
                localStorage.setItem('authToken','demo-token');
                dispatch(authLogin());
                navigate('/home');
            }
            else{
                alert('thong tin k chinh xac');
            }
            // const fetchApi = async () =>{
            //     try {
            //         const response = await  demoService.show()
            //         let arr = response;
            //         let check = false;
            //         for(let i = 0 ; i < arr.length ; i++){
            //             if(arr[i].name==='Glenna Reichert'){
            //                 console.log(arr[i])
            //                 check = true;
            //             }
            //         }
    
            //         if(check){
            //         localStorage.setItem('authToken','demo-token');
            //         dispatch(authLogin());
            //         navigate('/home');
            //         }
            //         else{
            //             alert('thong tin k chinh xac');
            //         }
                    
                    
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }
            // fetchApi();
        }
    })

    const handleOnclick = (e) => {
        // formik.resetForm();
        setShowFormSignup(true)
    }

    // login

    return (<div className={cx('wrapper')}>

        <div className="block__intro">
            <div className="block__messege">  <h1 style={{ color: 'black' }}>WELCOME TO WEBSITE</h1></div>
            <div className={cx('block__description')}>
                <h1 style={{ color: 'white' }}>
                    SHOTBOX
                </h1>
            </div>
        </div>

        <div className="login-container">
            <form action="" method="GET" className={cx("login")} onSubmit={formik.handleSubmit}>

                <h2 className={cx("login-title")}>LOG IN</h2>
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
                        <Tippy content={formik.errors.username} placement={'bottom'}>
                            <i className={`fa-solid fa-circle-exclamation ${cx('exclamation-mark')}`}></i>
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
                            <i className={`fa-solid fa-circle-exclamation ${cx('exclamation-mark')}`}></i>
                        </Tippy> : null
                    }
                </div>

                <div className={cx('group-control')}>
                    <button type="submit" className={cx("btn-login")}>Log in</button>
                </div>

                <div className={cx("forgot")}>
                    <a href="">Forgot password?</a>
                </div>

                <button className={cx("btn-signup")} type='button' onClick={handleOnclick}>Create new account</button>
            </form>
        </div>

        {showFormSignup &&
            <div className={cx("signup-container")}>
                <Signup setShowFormSignup={setShowFormSignup} />
            </div>
        }


    </div>);
}

export default LoginSigup;
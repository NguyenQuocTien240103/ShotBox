import classNames from 'classnames/bind'
import styles from './Input.module.scss'
import { Formik } from 'formik'
const cx = classNames.bind(styles)
function Input({ className, type, placeholder, error, value, setValue, ...otherProps }) {
    const classes = cx({
        [className]: className
    })
    return (
        <div className={cx('wrapper')}>
            <input className={classes} type={type} id={otherProps.id} name={otherProps.name} placeholder={placeholder} onChange={setValue} value={value} autoComplete={otherProps.autoComplete} />
            <span className={cx('message')}>{error}</span>
        </div>
    )
}

export default Input;



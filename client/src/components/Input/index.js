import classNames from 'classnames/bind'
import styles from './Input.module.scss'
const cx = classNames.bind(styles)
function Input({ className, type, placeholder, error, value, setValue, ...otherProps }) {
    const classes = cx({
        [className]: className
    })
    const handleChange = (e) => {
        setValue(pre => ({ ...pre, [otherProps.name]: e.target.value }))
        // setValue({ ...re })
    }
    return (
        <div className={cx('wrapper')}>
            <input className={classes} type={type} id={otherProps.id} name={otherProps.name} placeholder={placeholder} onChange={handleChange} value={value} autoComplete={otherProps.autoComplete} />
            <span className={cx('message')}>{error}</span>
        </div>
    )
}

export default Input;
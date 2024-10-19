import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import styles from './Images.module.scss'
const cx = classNames.bind(styles)
function Images() {
    const [img, setImg] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await axios.get('http://localhost:8080/images');
                console.log(res.data.data);
                const arr = res.data.data;
                setImg(arr);
            } catch (error) {
                console.error(error);
            }
        }
        getImages();
    }, []);

    return (
        <div>
            {/* Images */}
            {img.map((obj, index) => {
                return (
                    <img
                        key={index}
                        src={obj.url}
                        className={cx('img')}
                        alt="img"
                    />
                );
            })}
        </div>
    );
}

export default Images;

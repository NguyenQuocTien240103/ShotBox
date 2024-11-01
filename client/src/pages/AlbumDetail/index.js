import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AlbumDetail.module.scss';
import Menu from '../../components/Menu';
import * as AlbumService from '../../services/albumService';
import { Routes, Route, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function AlbumDetail() {
    // const { id } = useParams();
    // const [img, setImg] = useState([]);
    // useEffect(() => {
    //     const getImgFromAlbum = async () => {
    //         try {
    //             const res = await AlbumService.showImgFromAlbum(id);
    //             console.log(res.data);
    //             setImg(res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getImgFromAlbum();
    // }, [])
    // return (
    //     <div>
    //         {img.map((obj, index) => {
    //             return (
    //                 <img
    //                     key={index} // Thêm key cho từng phần tử
    //                     src={obj.url}
    //                 />
    //             );
    //         })}
    //     </div>
    // );
    const { id } = useParams();
    const [img, setImg] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const getImgFromAlbum = async () => {
            try {
                const res = await AlbumService.showImgFromAlbum(id);
                console.log(res.data);
                setImg(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getImgFromAlbum();
    }, [])

    useEffect(() => {
        if (activeIndex !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeIndex]);

    const handle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActiveIndex(null);
        }
    };
    return (
        <div className={cx('demo')}>
            {img.map((obj, index) => (
                <div key={index} className={cx('wrapper')}>
                    <img
                        src={obj.url}
                        className={cx('img')}
                        alt="img"
                    />
                    <div className={cx('hope')} ref={activeIndex === index ? menuRef : null}>
                        <i className={`fa-solid fa-bars ${cx('test')}`} onClick={() => handle(index)}>
                            {activeIndex === index && (

                                <Menu ImageObj={obj} setImg={setImg} />
                            )}
                        </i>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AlbumDetail;

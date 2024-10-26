import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Images.module.scss';
import * as ImageService from '../../services/imageService';
import Button from '../../components/Button';
import axios from 'axios';
const cx = classNames.bind(styles);

function Images() {
    const [img, setImg] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await ImageService.showAllImages();
                // console.log(res);
                setImg(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getImages();
    }, []);

    useEffect(() => {
        if (activeIndex !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeIndex]);

    const handleDeleteImg = (idImg) => {
        const deleteImg = async () => {
            try {
                const res = await ImageService.deleteImage(idImg);
                alert(res.message); // Sửa lại lỗi chính tả 'messege' thành 'message'
                setImg((prev) => prev.filter((img) => img.id !== idImg)); // Cập nhật lại danh sách ảnh sau khi xóa
            } catch (error) {
                console.error(error);
            }
        };
        deleteImg();
    };

    const handle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActiveIndex(null);
        }
    };
    const handleDownloadImg = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'demo.jpg';
            link.click();
            URL.revokeObjectURL(link.href); // Giải phóng bộ nhớ sau khi tải xong
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    const demo = async (url) => {
        try {
            const response = await axios.head(url);
            const fileSizeInBytes = response.headers['content-length'];
            const fileSizeInKB = fileSizeInBytes / 1024;
            console.log(`Dung lượng ảnh: ${fileSizeInKB.toFixed(2)} KB`);
        } catch (error) {
            console.error("Không thể lấy dung lượng ảnh:", error);
        }
    }

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
                                <div className={cx('menu-items')}>
                                    <Button four onClick={() => demo(obj.url)}>Get Size</Button>
                                    <Button four >Add To Album</Button>
                                    <Button four onClick={() => handleDownloadImg(obj.url)}>Download</Button>
                                    <Button four onClick={() => handleDeleteImg(obj.id)}>Delete</Button>
                                </div>
                            )}
                        </i>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Images;

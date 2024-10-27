import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Button from "../Button";
import axios from 'axios';
import * as ImageService from '../../services/imageService';
import { useEffect, useState } from "react";
import * as AlbumService from '../../services/albumService';

const cx = classNames.bind(styles);

function Menu({ ImageObj, setImg }) {
    const [album, setAlbum] = useState([]);
    const [test, setTest] = useState([]); // Khởi tạo test là mảng rỗng

    useEffect(() => {
        const showAlbum = async () => {
            try {
                const res = await AlbumService.showAllAlbums();
                // console.log(res.data);
                setAlbum(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        showAlbum();
    }, []);

    const demo = async (ImageObj) => {
        const url = ImageObj.url;
        try {
            const response = await axios.head(url);
            const fileSizeInBytes = response.headers['content-length'];
            const fileSizeInKB = fileSizeInBytes / 1024;
            console.log(`Dung lượng ảnh: ${fileSizeInKB.toFixed(2)} KB`);
        } catch (error) {
            console.error("Không thể lấy dung lượng ảnh:", error);
        }
    };

    const handleDownloadImg = async (ImageObj) => {
        const url = ImageObj.url;
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'demo.jpg';
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const handleDeleteImg = async (ImageObj) => {
        const idImg = ImageObj.id;
        try {
            const res = await ImageService.deleteImage(idImg);
            alert(res.message);
            setImg((prev) => prev.filter((img) => img.id !== idImg));
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowAlbumName = async (ImageObj, e) => {
        e.stopPropagation();
        console.log(album)
        const newItems = album.map(item => ({
            name: item.albumName
        }));
        setTest(prev => [...prev, ...newItems]);
    };

    const items = [
        {
            name: 'Get Size',
            handleOnclick: demo
        },
        {
            name: 'Add To Album',
            handleOnclick: handleShowAlbumName
        },
        {
            name: 'Download',
            handleOnclick: handleDownloadImg
        },
        {
            name: 'Delete',
            handleOnclick: handleDeleteImg
        }
    ];

    const current = test.length > 0 ? test : items;
    console.log(current)

    return (
        <div className={cx('wrapper')}>
            {test.length > 1 && (
                <Button four icon={<i className="fa-solid fa-arrow-left"></i>} className={cx('modifier')} onClick={(e) => {
                    e.stopPropagation();
                    setTest([]);
                }}>
                    Back
                </Button>
            )}

            {current.map((item, index) => (
                <Button key={index} four onClick={(e) => item.handleOnclick(ImageObj, e)}>
                    {item.name}
                </Button>
            ))}
        </div>
    );
}

export default Menu;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './AlbumDetail.module.scss';
import Button from '../../components/Button';
import FormConfirm from '../../components/FormConfirm';
import * as AlbumService from '../../services/albumService';
import * as AlbumImageService from '../../services/albumImageService';

import { useParams } from 'react-router-dom';
import Header from './Header';
import ImageCardList from '../../components/ImageCardList';
import Toolbar from '../../components/Toolbar';
import { useAlbumDetail } from '../../hooks/useAlbum';
import { useImagesByAlbumId } from '../../hooks/useAlbumImage';
const cx = classNames.bind(styles);
function AlbumDetail() {
    const { id } = useParams();
    const { albumDetail } = useAlbumDetail(id);
    const { img, setImg } = useImagesByAlbumId(id);
    const [displayAlbums, setDisplayAlbums] = useState([]);
    const [listIdImgChecked, setListIdImgChecked] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showFormConfirm, setShowFormConfirm] = useState(false);

    const handleDownloadImg = async (ImageObj, e) => {
        if (isDeleting) return;
        e.stopPropagation();
        const url = ImageObj.url;
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'image.jpg';
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }

    const handleDeleteImg = (ImageObj, e) => {
        console.log(ImageObj.id);
        if (isDeleting) return;
        e.stopPropagation();
        setIsDeleting(true);
        // document.removeEventListener('mousedown', handleClickOutside);
        const idAlbumImg = ImageObj.id;
        const deleteImgFromAlbum = async () => {
            try {
                const res = await AlbumImageService.deleteImgFromAlbum(idAlbumImg);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    onClose: () => {
                        setImg((prev) => prev.filter((img) => img.id !== idAlbumImg));
                        // setActiveIndex(null);
                        setIsDeleting(false);
                    },
                });
            } catch (error) {
                console.log(error);
                toast.error(`Error:${error.respone.data.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
            }
        }
        deleteImgFromAlbum();
    }

    const handleDeleteAlbum = (e) => {
        const deleteAlbum = async () => {
            const id = albumDetail.id;
            try {
                await AlbumService.deleteAlbum(id);
                window.location.href = "/album"
            } catch (error) {
                console.log(error);
            }
        }
        deleteAlbum();
    }

    const MenuItems = [
        {
            name: 'Download',
            icon: 'fa-solid fa-download',
            handleOnclick: handleDownloadImg
        },
        {
            name: 'Delete',
            icon: 'fa-solid fa-trash',
            handleOnclick: handleDeleteImg
        }
    ];

    const handleDeleteMutipleImgFromAlbum = (e) => {
        const fetchData = async () => {
            try {
                const res = await AlbumImageService.deleteMultipleImgFromAlbum(listIdImgChecked);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
                setListIdImgChecked([]);
                setImg((prev) => prev.filter((img) => !listIdImgChecked.includes(img.id)));
            } catch (error) {
                console.log(error);
                toast.success(`Error:${error.response.data.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
            }
        }
        fetchData();
    }

    const menuToolbar = [
        {
            icon: 'fa-solid fa-trash',
            handleOnclick: handleDeleteMutipleImgFromAlbum
        }
    ];
    //////////////////////////////////
    const handleOnclickCheckbox = (e, obj) => {
        setListIdImgChecked((pre) => {
            const isChecked = listIdImgChecked.includes(obj.id);
            if (isChecked) {
                return listIdImgChecked.filter(item => item !== obj.id);
            }
            else {
                return [...pre, obj.id]
            }
        });
    }
    return (
        <div className={cx('wrapper')}>
            <Header setShowFormConfirm={setShowFormConfirm} album={albumDetail} />
            <ImageCardList
                images={img}
                displayAlbums={displayAlbums}
                setDisplayAlbums={setDisplayAlbums}
                menuItems={MenuItems}
                isDeleting={isDeleting}
                handleCheckboxChange={handleOnclickCheckbox}
                listIdImgChecked={listIdImgChecked}
            />
            {
                listIdImgChecked.length > 0 &&
                <Toolbar
                    menuToolbar={menuToolbar}
                    listIdImgChecked={listIdImgChecked}
                />
            }
            {showFormConfirm && (
                <FormConfirm title={"Confirm"} content={"Do you want to delete this album?"}>
                    <div className={cx('modal-buttons')}>
                        <Button first onClick={() => setShowFormConfirm(false)} className={cx('btn-cancel')}>Cancel</Button>
                        <Button first onClick={(e) => handleDeleteAlbum(e)} className={cx('btn-delete')}>Delete</Button>
                    </div>
                </FormConfirm>
            )
            }
            <ToastContainer />

        </div >
    );
}

export default AlbumDetail;

import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Webcam.module.scss';
import classNames from 'classnames/bind';
import Camera from '../../components/Camera';
import Button from '../../components/Button';
import * as ImageService from '../../services/imageService';
const cx = classNames.bind(styles);

function Webcam() {
    const [capturedImage, setCapturedImage] = useState(null);
    const handleAddImages = async () => {
        const CLOUD_NAME = process.env.CLOUD_NAME;
        const PRESET_NAME = process.env.PRESET_NAME;
        const FOLDER_NAME = process.env.FOLDER_NAME;
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();
        formData.append('file', capturedImage); // 'file' là tên trường được yêu cầu bởi Cloudinary
        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME);

        try {
            const response = await axios.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const res = await ImageService.createImage({
                url: response.data.secure_url,
            })
            toast.success(`Success:${res.message}`, {
                position: "bottom-right",
                autoClose: 1000,
            });
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error(`Error:${error.response.data.message}`, {
                position: "bottom-right",
                autoClose: 1000,
            });
        }
    };

    return (
        <div className={cx('wrapper')} >
            {!capturedImage && <Camera setCapturedImage={setCapturedImage} />}
            {
                capturedImage && (
                    <div className={cx('block-img')}>
                        <img src={URL.createObjectURL(capturedImage)} className={cx('img')} alt="" />
                    </div>
                )
            }
            {
                capturedImage && (
                    <div className={cx('list-btn')}>
                        <Button icon={<i className={`fa-solid fa-arrows-rotate ${cx('icon-modifier')}`}></i>} first onClick={() => setCapturedImage(null)}>
                            Back
                        </Button>
                        <Button icon={<i className={`fa-solid fa-image ${cx('icon-modifier')}`}></i>} first onClick={handleAddImages}>
                            Add To Images
                        </Button>
                        <Button icon={<i className={`fa-solid fa-download ${cx('icon-modifier')}`}></i>} first onClick={() => {
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(capturedImage);
                            link.download = 'demo.jpg';
                            link.click();
                        }}>
                            Download
                        </Button>
                    </div>
                )
            }
            <ToastContainer />
        </div >
    );
}

export default Webcam;

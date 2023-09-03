import './File.css'
import axios from 'axios'
import fileIcon from './file.svg'
import formatBytes from '../../../utils/FormatBytes'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { useDeleteFileMutation } from '../../../store/api/api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ImageModal from '../../image_modal/ImageModal';

function File(file) {
    const [deleteFileQuery] = useDeleteFileMutation()
    const { AuthTokens } = useSelector(state => state.user)
    const { currentDir } = useSelector(state => state.files)
    const [clickedImg, setClickedImg] = useState(null);
    const [isImg, setIsImg] = useState(null);

    const forceDownload = (response, title) => {
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file.name)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)


    }

    const downloadWithAxios = (url, title) => {
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        }).then((response) => {
            forceDownload(response, title)
        }).catch((error) => console.log(error))

    }

    const downloadFile = () => {
        downloadWithAxios(file.file, file.id)
    }

    const handleClick = (file) => {
        setIsImg(['jpeg', 'jpg', 'gif', 'png'].includes(file.name.split('.')[1]))
        setClickedImg(file.file);
    };

    const deleteFile = () => {
        deleteFileQuery({ id: file.id, token: AuthTokens.access, dir_id: currentDir.id })
    }

    return (
        <>
            <div className='file' onClick={() => handleClick(file)}>
                <img src={fileIcon} alt='' className='file__icon'></img>
                <div className='file__name'>{file.name}</div>
                <div className='file__date'>{file.created_at}</div>
                <div className='file__size'>{formatBytes(file.size)}</div>
                <div className='crud_btns' onDoubleClick={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 40 }} className='file_icon' onClick={(e) => deleteFile()} />
                    <DownloadOutlinedIcon sx={{ fontSize: 40 }} className='file_icon' onClick={(e) => downloadFile()} />
                </div>
            </div>
            {clickedImg && (
                <ImageModal
                    clickedImg={clickedImg}
                    setClickedImg={setClickedImg}
                    isImg={isImg}
                    setIsImg={setIsImg}
                    filename={file.name}
                />
            )}
        </>
    )
}

export default File;
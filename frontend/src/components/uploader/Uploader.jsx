import './Uploader.css'
import { useSelector } from 'react-redux'
import UploadedFile from './UploadedFile'
import { size, toArray } from 'lodash'
import { useUploadFilesMutation } from '../../store/api/api'
import { useEffect } from 'react'
import { useActions } from '../../hooks/useActions'

const Uploader = () => {
    const { fileProgress } = useSelector(state => state.uploader)
    const uploadedFileAmount = size(fileProgress)
    const { clearFileProgress } = useActions()
    const [uploadFiles] = useUploadFilesMutation()

    useEffect(() => {
        const fileToUpload = toArray(fileProgress).filter(file => file.progress === 0)
        fileToUpload.map(async file => {
            await uploadFiles(file)
        })

    }, [uploadedFileAmount])



    return uploadedFileAmount > 0 ? (
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Uploading File</div>
                {toArray(fileProgress).filter(file => file.progress === 0).length === 0 && <div className="uploader__close" onClick={clearFileProgress}>X</div>}

            </div>
            <div className="uploader__content">
                {size(fileProgress)
                    ? toArray(fileProgress).map(file => <UploadedFile file={file} key={file.id} />)
                    : null}
            </div>
        </div>
    ) : null
}

export default Uploader
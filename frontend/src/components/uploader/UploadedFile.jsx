import './Uploader.css'

const UploadedFile = (props) => {
    const { file, progress } = props.file
    return (
        <div className='uploadfile'>
            <div className="uploadfile__header">
                <div className="uploadfile__name">{file.name}</div>
                <div className="uploadfile__remove">X</div>
            </div>
            <div className="uploadfile__progress-bar">
                <div className="uploadfile__upload-bar" style={{ width: progress + '%' }}></div>
                <div className="uploadfile__percent">{progress}%</div>
            </div>
        </div>
    )
}

export default UploadedFile
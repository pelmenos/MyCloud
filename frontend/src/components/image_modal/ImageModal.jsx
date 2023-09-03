import './ImageModal.css'

const ImageModal = ({
    clickedImg,
    setClickedImg,
    isImg,
    setIsImg,
    filename
}) => {
    const handleClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedImg(null);
        }
    };

    return (
        <>
            <div className="overlay dismiss" onClick={handleClick}>
                {isImg ? <img src={clickedImg} alt="bigger pic" /> : <div className='not_img'><div className='not_img_txt'>{filename} is not an image.<br></br> But you can download it!</div></div>}
                <span className="dismiss" onClick={handleClick}>
                    X
                </span>
            </div>
        </>
    );
};

export default ImageModal;
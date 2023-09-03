import './Support.css';
import UploadFile from './upload_file/UploadFile';
import CreateDir from './create_dir/CreateDir';
import BackArrow from './back_arrow/BackArrow';
import { useSelector } from 'react-redux';
import RenameDirPopup from '../file_list/file/rename_dir_popup/RenameDirPopup';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

function Support() {
    const { currentDir } = useSelector(state => state.files)
    return (
        <div className='support_block container'>
            <div className='folder_name'>{currentDir?.name}</div>
            <Breadcrumbs />
            <div className='left_button'>
                <BackArrow />
                <CreateDir />
                <UploadFile />
                <RenameDirPopup />
            </div>
        </div>
    )
}

export default Support
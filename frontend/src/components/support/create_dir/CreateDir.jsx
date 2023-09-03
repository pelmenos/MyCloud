import CreateDirPopup from './create_dir_popup/CreateDirPopup';
import { useActions } from '../../../hooks/useActions';

const CreateDir = () => {

    const { setPopupCreateDisplay } = useActions()

    return (
        <>
            <div className='create_folder_btn' onClick={(e) => setPopupCreateDisplay('flex')}>Create new folder</div>
            <CreateDirPopup />
        </>
    )
}

export default CreateDir
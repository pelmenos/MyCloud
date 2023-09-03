import { useSelector } from 'react-redux';
import { useDeleteFolderMutation } from '../../../store/api/api';
import formatBytes from '../../../utils/FormatBytes'
import './File.css'
import folderIcon from './folder.svg'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useActions } from '../../../hooks/useActions';

function Folder(folder) {
    const [deleteFolderQuery] = useDeleteFolderMutation()
    const { setPopupRename } = useActions()
    const { AuthTokens } = useSelector(state => state.user)

    const handleClick = () => {
        folder.setDir({ id: folder.id, name: folder.name })
    }

    const deleteFolder = () => {
        deleteFolderQuery({ id: folder.id, token: AuthTokens.access })
    }


    return (
        <div className='file' onClick={() => handleClick()}>
            <img src={folderIcon} alt='' className='file__icon'></img>
            <div className='file__name'>{folder.name}</div>
            <div className='file__date'>{folder.created_at}</div>
            <div className='file__size'>{formatBytes(folder.size)}</div>
            <div className='crud_btns' onClick={(e) => e.stopPropagation()}>
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 40 }} className='file_icon' onClick={(e) => deleteFolder()} />
                <EditNoteOutlinedIcon sx={{ fontSize: 40 }} className='file_icon' onClick={(e) => setPopupRename({ display: 'flex', id: folder.id })} />
            </div>
        </div>
    )
}

export default Folder;
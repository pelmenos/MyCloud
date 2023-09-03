import './FileList.css'
import File from './file/File';
import Folder from './file/Folder';
import SpeedLoadingAnimation from '../loading_animation/SpeedLoadingAnimation';
import { useSelector } from 'react-redux';
import { useGetFilesQuery, useGetFoldersQuery } from '../../store/api/api';
import { useActions } from '../../hooks/useActions';
import NoFileMessage from './no_files_message/NoFileMessage';



function FileList() {
    const { AuthTokens } = useSelector(state => state.user)
    const { currentDir } = useSelector(state => state.files)
    const { setDir } = useActions()
    const { currentData: folders, isLoading } = useGetFoldersQuery({ token: AuthTokens.access, dir_id: currentDir.id })
    const { currentData: files, isLoading: isLoading2 } = useGetFilesQuery({ token: AuthTokens.access, dir_id: currentDir.id })

    return (
        <div className='container'>
            {
                isLoading && isLoading2 ? <SpeedLoadingAnimation /> :
                    <div className="filelist">
                        <div className="filelist__header">
                            <div className="filelist__name">Name</div>
                            <div className="filelist__date">Date</div>
                            <div className="filelist__size">Size</div>
                        </div>

                        <div className='filelist__content'>
                            {folders && folders.map((el) => <Folder {...el} key={el.id} setDir={setDir} />)}
                            {files && files.map((el) => <File {...el} key={el.id} />)}
                            {!(folders || files) && <SpeedLoadingAnimation />}
                            {folders?.length === 0 && files?.length === 0 && <NoFileMessage />}
                        </div>
                    </div>
            }
        </div>
    )
}

export default FileList;
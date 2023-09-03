import { Breadcrumbs as MuiBreadCrumbs, } from '@mui/material'
import './Breadcrumbs.css'
import { useSelector } from 'react-redux'
import { useActions } from '../../../hooks/useActions'

const Breadcrumbs = () => {

    const { previousDirs } = useSelector(state => state.files)
    const { setDirForCrumb } = useActions()

    return (
        <div className='breadcrumbs'>
            <MuiBreadCrumbs separator="›" aria-label="breadcrumb">
                {previousDirs.map((el, index) => {
                    return (
                        <div key={index} onClick={(e) => { setDirForCrumb({ name: el.name, id: el.id, prev_dir_id: index }) }}>{el.name ? el.name : 'Main'}</div>
                    )
                })}
            </MuiBreadCrumbs>
        </div>
    )
}

export default Breadcrumbs
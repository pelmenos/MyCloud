import './Header.css';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';


function Header() {
    const { clearAuthData, clearError } = useActions()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    function logout() {
        clearAuthData()
        clearError()
        navigate('/login')
    }

    return (
        <div className='header'>
            <div className='container header_content'>
                <div className="logo">MYCLOUD</div>
                <div className="profile">
                    {user
                        ? <>
                            <div className="profile__name" onClick={() => logout()}>{user.username}</div>
                            <Avatar sx={{ bgcolor: '#15159E', width: 48, height: 48 }} alt="Remy Sharp" src="/broken-image.jpg" />
                        </>
                        : <>
                            <Link to='/login' onClick={() => clearError()} className='auth_btn'>Sign in</Link>
                            <Link to='/register' onClick={() => clearError()} className='reg_btn'>Sign up</Link>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Header
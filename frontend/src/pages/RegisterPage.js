import './AuthPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useSelector } from 'react-redux'
import LoadingAnimation from '../components/loading_animation/LoadingAnimation'

const RegisterPage = () => {
    const errorLine = '2px solid red'
    let [data, setData] = useState({ username: '', password: '', password2: '' })
    let [isDirty, setDirty] = useState(false)
    const { registerUser } = useActions()
    const { isLoading, errors } = useSelector(state => state.user)
    const navigate = useNavigate()


    function onSubmit(e) {
        e.preventDefault()
        registerUser(data)
            .unwrap()
            .then((originalPromiseResult) => {
                navigate('/')
            })
            .catch((rejectedValueOrSerializedError) => { setData({ username: '', password: '', password2: '' }) })
    }

    function handleChange(name, value) {
        setData({ ...data, [name]: value })
    }

    function blurHandler(e) {
        setDirty(true)
    }

    return (
        <>
            {isLoading ? <LoadingAnimation /> :
                <div className='form-container container'>
                    <form onSubmit={(e) => onSubmit(e)} className='form'>
                        <h1 className='form__title'>Registration</h1>
                        <div>
                            <input onBlur={(e) => blurHandler(e)} style={errors?.username ? { border: errorLine } : null} type='text' name='username' placeholder='Enter Username' className='form__input' autoComplete='none' onChange={(e) => { handleChange('username', e.target.value) }} value={data.username}></input>
                            <div className='error'>{isDirty && errors?.username}</div>
                        </div>
                        <div>
                            <input onBlur={(e) => blurHandler(e)} style={errors.password ? { border: errorLine } : null} type='password' name='password' placeholder='Enter password' className='form__input' onChange={(e) => { handleChange('password', e.target.value) }} value={data.password}></input>
                            <div className='error'>{isDirty && errors?.password}</div>
                        </div>
                        <div>
                            <input onBlur={(e) => blurHandler(e)} style={errors.password2 ? { border: errorLine } : null} type='password' name='password2' placeholder='Enter password again' className='form__input' onChange={(e) => { handleChange('password2', e.target.value) }} value={data.password2}></input>
                            <div className='error'>{isDirty && errors?.password2}</div>
                        </div>
                        {errors.detail && <div className='error'>{errors.detail}</div>}
                        <button type='submit' className='form__btn'>Sign up</button>
                    </form>
                </div>
            }
        </>
    )
}

export default RegisterPage


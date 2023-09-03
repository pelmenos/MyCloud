import React, { useState } from 'react'
import './AuthPage.css'
import { useActions } from '../hooks/useActions'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingAnimation from '../components/loading_animation/LoadingAnimation'

const errorLine = '2px solid red'

const LoginPage = () => {
    let [data, setData] = useState({ username: '', password: '' })
    const { loginUser, setAuthData, clearAuthData } = useActions()
    const { isLoading, errors } = useSelector(state => state.user)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        loginUser(data)
            .unwrap()
            .then((originalPromiseResult) => {
                setAuthData(originalPromiseResult)
                navigate('/')
            })
            .catch((rejectedValueOrSerializedError) => {
                clearAuthData()
                setData({ username: '', password: '' })
            })
    }


    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            {isLoading ? <LoadingAnimation /> :
                <div className='form-container container'>
                    <form onSubmit={(e) => { handleSubmit(e) }} className='form'>
                        <h1 className='form__title'>Authorization</h1>
                        <div>
                            <input style={errors?.username ? { border: errorLine } : null} type='text' name='username' placeholder='Enter Username' className='form__input' autoComplete='none' onChange={(e) => handleChange(e)} value={data.username}></input>
                            <div className='error'>{errors?.username}</div>
                        </div>
                        <div>
                            <input style={errors?.password ? { border: errorLine } : null} type='password' name='password' placeholder='Enter password' className='form__input' onChange={(e) => handleChange(e)} value={data.password}></input>
                            <div className='error'>{errors?.password}</div>
                        </div>
                        {errors?.detail && <div className='general_error'>{errors.detail}</div>}
                        <button type='submit' className='form__btn'>Sign in</button>
                    </form>
                </div>}
        </>
    )
}

export default LoginPage
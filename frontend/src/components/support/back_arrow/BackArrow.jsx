import { useActions } from '../../../hooks/useActions'

const BackArrow = () => {
    const { backDir } = useActions()

    const handleClick = () => {
        backDir()
    }

    return (
        <svg onClick={() => handleClick()} width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='back_arrow'>
            <path d="M7 1L1 5L7 9" stroke="#2B335D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 5H18.905C22.2837 5 25 8.46852 25 12.5938V14" stroke="#2B335D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default BackArrow
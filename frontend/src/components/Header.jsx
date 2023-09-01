import { NavLink } from 'react-router-dom'
import { GiAbstract014 } from "react-icons/gi";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineForm } from "react-icons/ai";
import { useContext } from 'react';
import { USERDATA } from '../App';




const Header = () => {
    const { currentUser, currentToken ,setCurrentUser,setCurrentToken} = useContext(USERDATA);

    const navLinkStyles = ({ isActive }) => {
        return {
            background: isActive ? "rgb(236,72,153)" : "none",
            borderRadius: "10px"
        };
    }

    const handleLogout =()=>{
        localStorage.removeItem('jwtToken');
        setCurrentToken("");
        setCurrentUser({});
    }
    return (
        <div className='fixed w-full h-[60px] flex justify-between items-center px-4 bg-gradient-to-r from-pink-500  to to-pink-700 text-white'>

            <div className='flex px-2 gap-2 items-center'>
                <GiAbstract014 size={30} color='beige' />
                <p className='text-2xl'>
                    MERN Authenntication
                </p>
            </div>

            <div >
                {
                    currentToken ?

                        <ul className='flex items-center px-2 gap-2'>
                            <li className='flex items-center px-3 py-1 gap-1 border rounded-md  text-[20px] text-slate-200 ' >{currentUser.name}</li>



                            <NavLink to='/login' style={navLinkStyles}>
                                <li onClick={handleLogout}
                                    className='flex items-center px-3 py-1 gap-1 text-[20px] rounded-md  hover:bg-pink-500'>
                                    <AiOutlineLogout />
                                    Logout
                                </li>
                            </NavLink>
                        </ul>
                        :
                        <ul className='flex items-center px-2 gap-2'>
                            <NavLink to='/login' style={navLinkStyles}>
                                <li className='flex items-center px-3 py-1 gap-1 text-[20px] rounded-md   '><AiOutlineLogin /> Login</li>
                            </NavLink>
                            <NavLink to='/register' style={navLinkStyles}>
                                <li className='flex items-center px-3 py-1 gap-1 text-[20px] rounded-md '><AiOutlineForm /> Register</li>
                            </NavLink>
                        </ul>
                }

            </div>

        </div>
    )
}

export default Header

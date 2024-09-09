import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useRef } from 'react';
import AdminSpace from '../admin_components/AdminSpace';
import { logout } from '../redux/userslice';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [adminSpaceOpen, setAdminSpaceOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const adminSpaceRef = useRef(null);

    const toggleAdminSpaceHandler = () => {
        setAdminSpaceOpen(!adminSpaceOpen);
    };

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
    
            if (res.status === 200) {
                toast.success('Logged out successfully', { duration: 3000 });
                dispatch(logout(null));
                navigate('/');
                setDropdownOpen(false);
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
        if (adminSpaceRef.current && !adminSpaceRef.current.contains(event.target)) {
            setAdminSpaceOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-green">
            <div className="flex flex-wrap items-center justify-between max-w-[90%] mx-auto">
                <div className='flex gap-6'>
                    <RxHamburgerMenu 
                        onClick={toggleAdminSpaceHandler}
                        className="text-2xl mt-10 cursor-pointer hidden sm:block"
                    />
                    <Link to={'/'}>
                        <img 
                            src="https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/RemoveBG%20Logo.png?alt=media&token=c57a9f44-6ed1-4fa4-84e5-d76d735ebd3c" 
                            alt="logo" 
                            className='w-32 -ml-6 sm:w-52 h-20 sm:h-24 object-contain cursor-pointer'
                        />
                    </Link>
                </div>
                
                <ul className='flex gap-6 items-center'>
                    <Link to='/'>
                        <li className='hidden sm:inline hover:underline sm:text-lg text-white'>Home</li>
                    </Link>
                    
                    <li className='relative' ref={dropdownRef}>
                        <div onClick={handleDropdown} className='flex gap-2 items-center cursor-pointer'>
                            {currentUser ? (
                                <>
                                    <span className='sm:inline mt-[1px] sm:text-lg font-semibold italic'>{currentUser?.name}</span>
                                </>
                            ) : (
                                <Link to='/login' className='hover:underline sm:text-lg text-white'>Login</Link>
                            )}
                        </div>
                        {currentUser && dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                                <ul className='py-1'>
                                    <li onClick={() => setDropdownOpen(false)}>
                                        <Link to='/userdashboard' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>Dashboard</Link>
                                    </li>
                                    <li onClick={() => setDropdownOpen(false)}>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                                    </li>
                                </ul>
                                
                            </div>
                        )}
                    </li>

                    {/* <li className='sm:hidden' onClick={handleMenu} ref={menuRef}>
                        {!menuOpen ? <IoMdMenu className='sm:hidden text-2xl'/> : <IoMdClose className='sm:hidden text-2xl'/>}
                    </li> */}
                </ul>
            </div>

            {menuOpen && 
                <div className='absolute right-[80px] bg-footer_red text-dark_green md:right-0 w-[180px] min-h-screen' ref={adminSpaceRef}>
                    <AdminSpace/>
                </div>
            }
            {adminSpaceOpen && 
                <div className='absolute left text-white hidden sm:block' ref={adminSpaceRef}>
                    <AdminSpace adminSpace={setAdminSpaceOpen}/>
                </div>
            }
            <Toaster />
        </header>
    );
};

export default Navbar;

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminSpace = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');
    // const { role } = useSelector((state) => state.user.currentUser);

    const handleSelectChange = (path) => {
        setSelectedOption(path);
        navigate(path);
    };

    const isCurrentPath = (path) => location.pathname === path;

    return (
        <div>
            <div className="bg-light_green border-3 border-black md:mr-8 p-4 h-screen w-[300px]  shadow-2xl">
                <div className="flex flex-col md:justify-center md:items-center ">
                    <button className="md:text-3xl text-xl text-center font-medium text-arshabodhini_brown">
                        <Link to="/admindashboard">Admin's Space</Link>
                    </button>

                    <div className="border border-arshabodhini_brown text-arshabodhini_brown rounded-lg hover:opacity-95 disabled:opacity-80 w-40 md:w-52 self-center mt-7 text-center">
                        <div className="bg-arshabodhini_brown h-[50px] mb-3 rounded-t-md md:w-[207px] flex items-center justify-center">
                            <h1 className="text-xl text-white">Settings</h1>
                        </div>
                        <div className="flex flex-col gap-2 font-normal text-lg  mb-3">
                            <Link
                                to="/list-user"
                                className={`text-left ${isCurrentPath('/list-user') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/list-user')}>
                                    User
                                </button>
                            </Link>
                            <Link
                                to="/list-topic"
                                className={`text-left ${isCurrentPath('/list-topic') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/list-topic')}>
                                    Topic
                                </button>
                            </Link>
                            <Link
                                to="/list-class"
                                className={`text-left ${isCurrentPath('/list-class') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/list-class')}>
                                    Class
                                </button>
                            </Link>
                            <Link
                                to="/list-mode"
                                className={`text-left ${isCurrentPath('/list-mode') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/list-mode')}>
                                    Mode
                                </button>
                            </Link>
                            <Link
                                to="/admin"
                                className={`text-left ${isCurrentPath('/admin') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/admin')}>
                                    Report
                                </button>
                            </Link>
                            <Link
                                to="/list-location"
                                className={`text-left ${isCurrentPath('/list-location') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/list-location')}>
                                    Location
                                </button>
                            </Link>

                            <Link
                                to="/list-schedule"
                                className={`text-left ${isCurrentPath('/list-schedule') ? 'text-white bg-hover_grey' : 'text-arshabodhini_brown hover:bg-arshabodhini_brown hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/list-schedule')}>
                                    Class Schedule
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSpace;

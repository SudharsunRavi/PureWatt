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
                    <button className="md:text-3xl text-xl text-center font-medium text-dark_green">
                        <Link to="/admindashboard">Admin's Space</Link>
                    </button>

                    <div className="border border-dark_green text-arshabodhini_brown rounded-lg hover:opacity-95 disabled:opacity-80 w-40 md:w-52 self-center mt-7 text-center">
                        <div className="bg-dark_green h-[50px] mb-3 rounded-t-md md:w-[207px] flex items-center justify-center">
                            <h1 className="text-xl text-white">Settings</h1>
                        </div>
                        <div className="flex flex-col gap-2 font-normal text-lg  mb-3">
                            <Link
                                to="/proposal"
                                className={`text-left ${isCurrentPath('/proposal') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/proposal')}>
                                    Proposal
                                </button>
                            </Link>
                            <Link
                                to="/solarplant-details"
                                className={`text-left ${isCurrentPath('/solarplant-details') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/solarplant-details')}>
                                    Solar Plant Details
                                </button>
                            </Link>
                            <Link
                                to="/windplant-details"
                                className={`text-left ${isCurrentPath('/windplant-details') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/windplant-details')}>
                                    Wind Plant Details
                                </button>
                            </Link>
                            <Link
                                to="/fundingreceived"
                                className={`text-left ${isCurrentPath('/fundingreceived') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/fundingreceived')}>
                                    Funding Received
                                </button>
                            </Link>
                            <Link
                                to="/powerplant-create"
                                className={`text-left ${isCurrentPath('/powerplant-create') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/powerplant-create')}>
                                    Create Powerplant
                                </button>
                            </Link>

                            <Link
                                to="/powerplant-edit/:id"
                                className={`text-left ${isCurrentPath('/powerplant-edit/:id') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/powerplant-edit/:id')}>
                                    Edit Powerplant
                                </button>
                            </Link>
                            
                            <Link
                                to="/solarplant"
                                className={`text-left ${isCurrentPath('/solarplant') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/solarplant')}>
                                    Solar Powerplant
                                </button>
                            </Link>
                            <Link
                                to="/windplant"
                                className={`text-left ${isCurrentPath('/windplant') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/windplant')}>
                                    Wind Powerplant
                                </button>
                            </Link>
                            <Link
                                to="/solarplant-edit/:id"
                                className={`text-left ${isCurrentPath('/solarplant-edit/:id') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/solarplant-edit/:id')}>
                                    Edit Solar Powerplant
                                </button>
                            </Link>
                            <Link
                                to="/windplant-edit/:id"
                                className={`text-left ${isCurrentPath('/windplant-edit/:id') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/windplant-edit/:id')}>
                                    Edit Wind Powerplant
                                </button>
                            </Link>
                            <Link
                                to="/fundingreceived-edit/:id"
                                className={`text-left ${isCurrentPath('/fundingreceived-edit/:id') ? 'text-white bg-green' : 'text-white hover:bg-green hover:text-white'}`}
                            >
                                <button className='px-4' onClick={() => handleSelectChange('/fundingreceived-edit/:id')}>
                                    Edit Fundings
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

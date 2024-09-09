import { Table, Modal, ConfigProvider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
// import AdminSpace from "../AdminSpace";

const SolarPlantDetails = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const fetchSolarDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solar/getdetails`);
            const data = await response.json();

            console.log(data)

            setData(data);
            setFilteredData(data.data);
        } catch (error) {
            console.error('Error fetching Solar Details:', error);
        }
    };

    const columns = [
        {
            title: 'Solar Irradiance',
            dataIndex: 'solarirradiance',
            key: 'solarirradiance',
            ellipsis: true,
        },
        {
            title: 'Performance Ratio',
            dataIndex: 'performanceratio',
            key: 'performanceratio',
            ellipsis: true,
        },
        {
            title: 'Module Efficiency',
            dataIndex: 'moduleefficiency',
            key: 'moduleefficiency',
            ellipsis: true,
        },
        {
            title: 'Inverter Efficiency',
            dataIndex: 'inverterefficiency',
            key: 'inverterefficiency',
            ellipsis: true,
        },
        {
            title: 'CUF',
            dataIndex: 'cuf',
            key: 'cuf',
            ellipsis: true,
            width: 80,
        },
        {
            title: 'Degradation Rate',
            dataIndex: 'degradationrate',
            key: 'degradationrate',
            ellipsis: true,
        },
        {
            title: 'Grid Availability',
            dataIndex: 'gridavailability',
            key: 'gridavailability',
            ellipsis: true,
        }
    ];

    useEffect(() => {
        fetchSolarDetails();
    }, []);

    return (
        <div className='flex justify-center mt-10'>
            <div className="absolute inset-0 bg-black">
                <img 
                src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
                className="h-screen w-screen object-cover opacity-40"
                alt = "Background" />   
            </div>

          <div className="w-11/12 mx-auto text-sm mt-10">
              <div className="absolute z-10 flex justify-between items-center mb-4 mt-[-50px]">
                  <h1 className="text-3xl font-semibold text-white">Solar Power Plant Details</h1>
              </div>

              <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: '#3A4D39',
                                headerColor: '#ffff',
                                rowHoverBg: '#ECE3CE',
                            },
                        },
                    }}
                >
                <Table dataSource={filteredData} columns={columns} bordered={true} scroll={{ y: 550 }} rowKey="plantid" />
                </ConfigProvider>
          </div>
        </div>
    );
};

export default SolarPlantDetails;
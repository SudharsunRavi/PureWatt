import { Table, Modal, ConfigProvider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
// import AdminSpace from "../AdminSpace";

const WindPlantDetails = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const fetchWindDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/wind/getdetails`);
            const data = await response.json();
            
            const windDataArray = Array.isArray(data.data) ? data.data : [data.data];
            setData(windDataArray);
            setFilteredData(windDataArray);
        } catch (error) {
            console.error('Error fetching Wind Details:', error);
            setFilteredData([]);
        }
    };    

    const columns = [
        {
            title: 'Wind Speed',
            dataIndex: 'windspeed',
            key: 'windspeed',
            ellipsis: true,
        },
        {
            title: 'Turbine Efficiency',
            dataIndex: 'turbineefficiency',
            key: 'turbineefficiency',
            ellipsis: true,
        },
        {
            title: 'Capacity Factor',
            dataIndex: 'capacityfactor',
            key: 'capacityfactor',
            ellipsis: true,
        },
        {
            title: 'Turbine Rotor Diameter',
            dataIndex: 'turbinerotordiameter',
            key: 'turbinerotordiameter',
            ellipsis: true,
        },
        {
            title: 'Hub Height',
            dataIndex: 'hubheight',
            key: 'hubheight',
            ellipsis: true,
        },
        {
            title: 'Turbine Availability',
            dataIndex: 'turbineavailability',
            key: 'turbineavailability',
            ellipsis: true,
            width: 80,
        },
    ];

    useEffect(() => {
        fetchWindDetails();
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
                  <h1 className="text-3xl font-semibold text-white">Wind Power Plant Details</h1>
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

export default WindPlantDetails;
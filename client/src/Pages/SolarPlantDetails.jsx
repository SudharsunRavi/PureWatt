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
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching Solar Details:', error);
        }
    };

    const columns = [
        // {
        //     title: 'Plant Name',
        //     dataIndex: 'modename',
        //     key: 'modename',
        //     ellipsis: true,
        // },
        // {
        //     title: 'Location',
        //     dataIndex: 'description',
        //     key: 'description',
        //     ellipsis: true,
        // },
        // {
        //     title: 'Capacity (MW)',
        //     dataIndex: 'description',
        //     key: 'description',
        //     ellipsis: true,
        // },
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
        },
        // {
        //     title: 'Edit/Delete',
        //     key: 'actions',
        //     width: 110,
        //     render: (text, record) => (
        //         <div className="flex items-center gap-8">
        //             <button className="text-2xl" onClick={() => handleEdit(record)}>
        //                 <Tooltip title={"Edit"}> <CiEdit /> </Tooltip> 
        //             </button>
        //             <button className="text-2xl" onClick={() => showDeleteConfirm(record)}>
        //                 <Tooltip title={"Delete"}><AiOutlineDelete /></Tooltip>
        //             </button>
        //         </div>
        //     ),
        // },
    ];

    useEffect(() => {
        fetchSolarDetails();
    }, []);

    const rowClassName = (record, index) => {
        return 'text-left';
    };

    return (
        <div className='flex justify-center mt-10'>

          <div className="w-11/12 mx-auto text-sm">
              <div className=" mt-6 flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-semibold">Solar Power Plant Details</h1>
              </div>

              <ConfigProvider
                  theme={{
                      components: {
                          Table: {
                              headerBg: '#3A4D39',
                              headerColor: '#ffffff',
                              rowHoverBg: '#739072',
                          },
                      },
                  }}
              >
                  <Table dataSource={filteredData} columns={columns} bordered={true} rowClassName={rowClassName} scroll={{ y: 550 }} rowKey="plantid" />
              </ConfigProvider>
          </div>
        </div>
    );
};

export default SolarPlantDetails;
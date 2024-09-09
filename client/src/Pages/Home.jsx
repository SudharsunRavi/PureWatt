import { Table, Modal, ConfigProvider, Tooltip } from "antd";
import { useEffect, useState } from "react";
// import AdminSpace from "../AdminSpace";

const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const columns = [
        {
            title: 'Plant Name',
            dataIndex: 'modename',
            key: 'modename',
            ellipsis: true,
        },
        {
            title: 'Plant Type',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Location',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Total Fund',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Payback Period',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Return on Investment',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
    ];

    const rowClassName = (record, index) => {
        return 'text-left';
    };

    return (
        <div className='flex justify-center mt-10'>
            <div className="absolute inset-0 bg-black">
                <img 
                src={'https://firebasestorage.googleapis.com/v0/b/purewatt-62253.appspot.com/o/purewatt.png?alt=media&token=079def2f-5115-452d-aef2-035a58556eb3'}
                className="h-screen w-screen object-cover opacity-40"
                alt = "Background" />   
            </div>

          <div className="w-11/12 mx-auto text-sm">
              <div className=" mt-6 flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-semibold">Current Projects</h1>
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
                  <Table dataSource={filteredData} columns={columns} bordered={true} rowClassName={rowClassName} scroll={{ y: 550 }} rowKey="modename" />
              </ConfigProvider>
          </div>
        </div>
    );
};

export default Home;


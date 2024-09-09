import { Table, Modal, ConfigProvider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
// import AdminSpace from "../AdminSpace";

const WindPlantDetails = () => {
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
            title: 'Location',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Wind Speed',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Turbine Efficiency',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Capacity Factor',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Turbine Rotor Diameter',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Hub Height',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Turbine Availability',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: 80,
        },
        {
            title: 'Edit/Delete',
            key: 'actions',
            width: 110,
            render: (text, record) => (
                <div className="flex items-center gap-8">
                    <button className="text-2xl" onClick={() => handleEdit(record)}>
                        <Tooltip title={"Edit"}> <CiEdit /> </Tooltip> 
                    </button>
                    <button className="text-2xl" onClick={() => showDeleteConfirm(record)}>
                        <Tooltip title={"Delete"}><AiOutlineDelete /></Tooltip>
                    </button>
                </div>
            ),
        },
    ];

    const rowClassName = (record, index) => {
        return 'text-left';
    };

    return (
        <div className='flex justify-center mt-10'>

          <div className="w-11/12 mx-auto text-sm">
              <div className=" mt-6 flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-semibold">Wind Power Plant Details</h1>
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

export default WindPlantDetails;
import React, { useEffect, useState } from 'react';
import { Table, Tabs, Select, message } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminDashboard = () => {
  const [fundings, setFundings] = useState([]);
  const [powerPlants, setPowerPlants] = useState([]);
  const [solarPlants, setSolarPlants] = useState([]);
  const [windPlants, setWindPlants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const fundingsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/getdetails`);
      const fundingsData = await fundingsResponse.json();
      setFundings(fundingsData.data);

      const powerPlantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getdetails`);
      const powerPlantData = await powerPlantResponse.json();
      setPowerPlants(powerPlantData.data);

      const solarPlantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/solar/getdetails`);
      const solarPlantData = await solarPlantResponse.json();
      setSolarPlants(solarPlantData.data);

      const windPlantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/wind/getdetails`);
      const windPlantData = await windPlantResponse.json();
      setWindPlants(windPlantData.data);

      const userResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
      const userData = await userResponse.json();
      setUsers(userData.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (value, userId) => {
    try {
      // Update the user role in the database
      await fetch(`${import.meta.env.VITE_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: value }),
      });

      const updatedUsers = users.map(user =>
        user.userid === userId ? { ...user, role: value } : user
      );
      setUsers(updatedUsers);
      message.success('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      message.error('Failed to update role');
    }
  };

  const fundingColumns = [
    { title: 'Plant ID', dataIndex: 'plantid', key: 'plantid' },
    { title: 'Revenue streams', dataIndex: 'revenuestreams', key: 'revenuestreams' },
    { title: 'CAPEX', dataIndex: 'capex', key: 'capex' },
    { title: 'OPEX', dataIndex: 'opex', key: 'opex' },
    { title: 'ROI', dataIndex: 'roi', key: 'roi' },
    { title: 'Payback Period', dataIndex: 'paybackperiod', key: 'paybackperiod' },
    { title: 'LCOE', dataIndex: 'lcoe', key: 'lcoe' },
  ];

  const powerPlantColumns = [
    { title: 'Powerplant ID', dataIndex: 'powerplantid', key: 'powerplantid' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Capacity (MW)', dataIndex: 'installedcapacitymw', key: 'installedcapacitymw' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
  ];

  const solarPlantColumns = [
    { title: 'Solar Plant ID', dataIndex: 'solarpowerplantid', key: 'solarpowerplantid' },
    { title: 'Plant ID', dataIndex: 'plantid', key: 'plantid' },
    { title: 'Solar Irradiance', dataIndex: 'solarirradiance', key: 'solarirradiance' },
    { title: 'Performance Ratio', dataIndex: 'performanceratio', key: 'performanceratio' },
  ];

  const windPlantColumns = [
    { title: 'Wind Plant ID', dataIndex: 'windpowerplantid', key: 'windpowerplantid' },
    { title: 'Plant ID', dataIndex: 'plantid', key: 'plantid' },
    { title: 'Wind Speed', dataIndex: 'windspeed', key: 'windspeed' },
    { title: 'Turbine Efficiency', dataIndex: 'turbineefficiency', key: 'turbineefficiency' },
  ];

  const userColumns = [
    { title: 'User ID', dataIndex: 'userid', key: 'userid' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phonenumber', key: 'phonenumber' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Pincode', dataIndex: 'pincode', key: 'pincode' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => (
        <Select
          value={text}
          style={{ width: 120 }}
          onChange={value => handleRoleChange(value, record.userid)}
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
          <Option value="superadmin">Superadmin</Option>
        </Select>
      ),
    },
    { title: 'Created At', dataIndex: 'createdat', key: 'createdat' },
  ];

  return (
    <div className="p-6">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Fundings Received" key="1">
          <Table columns={fundingColumns} dataSource={fundings} loading={loading} rowKey="fundingid" />
        </TabPane>

        <TabPane tab="Powerplants" key="2">
          <Table columns={powerPlantColumns} dataSource={powerPlants} loading={loading} rowKey="powerplantid" />
        </TabPane>

        <TabPane tab="Solar Powerplants" key="3">
          <Table columns={solarPlantColumns} dataSource={solarPlants} loading={loading} rowKey="solarpowerplantid" />
        </TabPane>

        <TabPane tab="Wind Powerplants" key="4">
          <Table columns={windPlantColumns} dataSource={windPlants} loading={loading} rowKey="windpowerplantid" />
        </TabPane>

        <TabPane tab="Users" key="5">
          <Table columns={userColumns} dataSource={users} loading={loading} rowKey="userid" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { Table, Tabs } from 'antd';

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [fundings, setFundings] = useState([]);
  const [powerPlants, setPowerPlants] = useState([]);
  const [solarPlants, setSolarPlants] = useState([]);
  const [windPlants, setWindPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch function for different tables
  const fetchData = async () => {
    try {
      // Fetch Fundings Received
      const fundingsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/financialparams/getdetails`); // Replace with your API endpoint
      const fundingsData = await fundingsResponse.json();
      setFundings(fundingsData.data);

      // Fetch Powerplant
      const powerPlantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/powerplant/getdetails`); // Replace with your API endpoint
      const powerPlantData = await powerPlantResponse.json();
      setPowerPlants(powerPlantData.data);

      // Fetch Solar Powerplant
      const solarPlantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/solar/getdetails`); // Replace with your API endpoint
      const solarPlantData = await solarPlantResponse.json();
      setSolarPlants(solarPlantData.data);

      // Fetch Wind Powerplant
      const windPlantResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/wind/getdetails`); // Replace with your API endpoint
      const windPlantData = await windPlantResponse.json();
      setWindPlants(windPlantData.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Columns for each table
  const fundingColumns = [
    { title: 'Plant ID', dataIndex: 'plantid', key: 'plantid' },
    { title: 'Revenue streams', dataIndex: 'revenuestreams', key: 'revenuestreams' },
    { title: 'CAPEX', dataIndex: 'capex', key: 'capex' },
    { title: 'OPEX', dataIndex: 'opex', key: 'opex' },
    { title: 'ROI', dataIndex: 'roi', key: 'roi' },
    { title: 'Payback Period', dataIndex: 'paybackperiod', key: 'paybackperiod' },
    { title : 'LCOE', dataIndex: 'lcoe', key: 'lcoe' },
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

  return (
    <div className="p-6">
      {/* Tabs for each table */}
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

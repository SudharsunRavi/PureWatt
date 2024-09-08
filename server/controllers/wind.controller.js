const pool=require('../DBconnection');

const create = (req, res) => {
    const {plantid, windspeed, turbineefficiency, capacityfactor, turbinerotordiameter, hubheight, turbineavailability, createdby, modifiedat}=req.body;
    try {
        const newWind = pool.query(
            'INSERT INTO wind (plantid, windspeed, turbineefficiency, capacityfactor, turbinerotordiameter, hubheight, turbineavailability, createdby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [plantid, windspeed, turbineefficiency, capacityfactor, turbinerotordiameter, hubheight, turbineavailability, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newWind.rows[0] });      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
};

const update = (req, res) => {
    const {windpowerplantid, plantid, windspeed, turbineefficiency, capacityfactor, turbinerotordiameter, hubheight, turbineavailability, createdby, modifiedat}=req.body;
    try {
        const newWind = pool.query(
            'UPDATE wind SET plantid = $2, windspeed = $3, turbineefficiency = $4, capacityfactor = $5, turbinerotordiameter = $6, hubheight = $7, turbineavailability = $8, createdby = $9, modifiedat = $10 WHERE windpowerplantid = $1 RETURNING *',
            [windpowerplantid, plantid, windspeed, turbineefficiency, capacityfactor, turbinerotordiameter, hubheight, turbineavailability, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newWind.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
};

const deleteWind = (req, res) => {
    const {windpowerplantid}=req.body;
    try {
        pool.query('DELETE FROM wind WHERE windpowerplantid = $1', [windpowerplantid]);
        pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Wind power plant deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
};

const getDetails = (req, res) => {
    try {
        const wind = pool.query('SELECT * FROM wind');
        return res.status(200).json({ status: 'true', data: wind.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
};

module.exports={create, update, deleteWind, getDetails};
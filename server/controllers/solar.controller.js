const pool=require('../DBconnection');

const create = async (req, res) => {
    const {plantid, solarirradiance, performanceratio, moduleefficiency, inverterefficiency, cuf, degradationrate, gridavailability, createdby, modifiedat} = req.body;
    try {
        const newSolar = await pool.query(
            'INSERT INTO solar (plantid, solarirradiance, performanceratio, moduleefficiency, inverterefficiency, cuf, degradationrate, gridavailability, createdby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [plantid, solarirradiance, performanceratio, moduleefficiency, inverterefficiency, cuf, degradationrate, gridavailability, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newSolar.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const update = async (req, res) => {
    const {solarpowerplantid, plantid, solarirradiance, performanceratio, moduleefficiency, inverterefficiency, cuf, degradationrate, gridavailability, createdby, modifiedat} = req.body;
    try {
        const newSolar = await pool.query(
            'UPDATE solar SET plantid = $2, solarirradiance = $3, performanceratio = $4, moduleefficiency = $5, inverterefficiency = $6, cuf = $7, degradationrate = $8, gridavailability = $9, createdby = $10, modifiedat = $11 WHERE solarpowerplantid = $1 RETURNING *',
            [solarpowerplantid, plantid, solarirradiance, performanceratio, moduleefficiency, inverterefficiency, cuf, degradationrate, gridavailability, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newSolar.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const deleteSolar = async (req, res) => {
    const {solarpowerplantid} = req.body;
    try {
        await pool.query('DELETE FROM solar WHERE solarpowerplantid = $1', [solarpowerplantid]);
        pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Solar power plant deleted' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const getDetails = async (req, res) => {
    try {
        const solar = await pool.query('SELECT * FROM solar');
        return res.status(200).json({ status: 'true', data: solar.rows });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

module.exports = { create, update, deleteSolar, getDetails };
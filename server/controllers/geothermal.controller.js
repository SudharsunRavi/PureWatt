const pool=require('../DBconnection');

const create = async (req, res) => {
    const {plantid, geothermalresourcetemp, conversionefficiency, capacityfactor, drillingdepth, createdby, modifiedat} = req.body;
    try {
        const newGeothermal = await pool.query(
            'INSERT INTO geothermal (plantid, geothermalresourcetemp, conversionefficiency, capacityfactor, drillingdepth, createdby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [plantid, geothermalresourcetemp, conversionefficiency, capacityfactor, drillingdepth, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newGeothermal.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
};

const update = async (req, res) => {
    const {geothermalpowerplantid, plantid, geothermalresourcetemp, conversionefficiency, capacityfactor, drillingdepth, createdby, modifiedat} = req.body;
    try {
        const newGeothermal = await pool.query(
            'UPDATE geothermal SET plantid = $2, geothermalresourcetemp = $3, conversionefficiency = $4, capacityfactor = $5, drillingdepth = $6, createdby = $7, modifiedat = $8 WHERE geothermalpowerplantid = $1 RETURNING *',
            [geothermalpowerplantid, plantid, geothermalresourcetemp, conversionefficiency, capacityfactor, drillingdepth, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newGeothermal.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
};

const deleteGeothermal = async (req, res) => {
    const {geothermalpowerplantid} = req.body;
    try {
        await pool.query('DELETE FROM geothermal WHERE geothermalpowerplantid = $1', [geothermalpowerplantid]);
        pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Geothermal power plant deleted' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
};

const getDetails = async (req, res) => {
    try {
        const geothermal = await pool.query('SELECT * FROM geothermal');
        return res.status(200).json({ status: 'true', data: geothermal.rows });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
};

module.exports = { create, update, deleteGeothermal, getDetails };
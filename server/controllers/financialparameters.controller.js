const pool = require('../DBconnection');

const create= async (req, res) => {
    const { plantid, capex, opex, lcoe, paybackperiod, roi, revenuestreams, createdby, modifiedat } = req.body;
    try {
        const newFinancialParams = await pool.query(
            'INSERT INTO financialparameters (plantid, capex, opex, lcoe, paybackperiod, roi, revenuestreams, createdby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [plantid, capex, opex, lcoe, paybackperiod, roi, revenuestreams, createdby, modifiedat]
        );
        await pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newFinancialParams.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const update = async (req, res) => {
    const { financialparametersid, plantid, capex, opex, lcoe, paybackperiod, roi, revenuestreams, createdby, modifiedat } = req.body;
    try {
        const newFinancialParams = await pool.query(
            'UPDATE financialparameters SET capex = $2, opex = $3, lcoe = $4, paybackperiod = $5, roi = $6, revenuestreams = $7, createdby = $8, modifiedat = $9, plantid=$10 WHERE financialparametersid = $1 RETURNING *',
            [financialparametersid, capex, opex, lcoe, paybackperiod, roi, revenuestreams, createdby, modifiedat, plantid]
        );
        await pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newFinancialParams.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const deleteParam = async (req, res) => {
    const { financialparametersid } = req.body;
    try {
        await pool.query('DELETE FROM financialparameters WHERE financialparametersid = $1', [financialparametersid]);
        await pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Financial parameters deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const getDetails = async (req, res) => {
    try {
        const financialParams = await pool.query('SELECT * FROM financialparameters');
        return res.status(200).json({ status: 'true', data: financialParams.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

module.exports = { create, update, deleteParam, getDetails };
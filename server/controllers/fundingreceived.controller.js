const pool=require('../DBconnection');

const create = async (req, res) => {
    const { plantid, amount, source, receiveddate, createdby, modifiedby, modifiedat } = req.body;
    try {
        const newFundingReceived = await pool.query(
            'INSERT INTO fundingreceived (plantid, amount, source, receiveddate, createdby, modifiedby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [plantid, amount, source, receiveddate, createdby, modifiedby, modifiedat]
        );
        await pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newFundingReceived.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const update = async (req, res) => {
    const { fundingreceivedid, plantid, amount, source, receiveddate, createdby, modifiedby, modifiedat } = req.body;
    try {
        const newFundingReceived = await pool.query(
            'UPDATE fundingreceived SET plantid = $2, amount = $3, source = $4, receiveddate = $5, createdby = $6, modifiedby = $7, modifiedat = $8 WHERE fundingreceivedid = $1 RETURNING *',
            [fundingreceivedid, plantid, amount, source, receiveddate, createdby, modifiedby, modifiedat]
        );
        await pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newFundingReceived.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const deleteFundingReceived = async (req, res) => {
    const { fundingreceivedid } = req.body;
    try {
        await pool.query('DELETE FROM fundingreceived WHERE fundingreceivedid = $1', [fundingreceivedid]);
        await pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Funding received deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const getDetails = async (req, res) => {
    try {
        const fundingReceived = await pool.query('SELECT * FROM fundingreceived');
        return res.status(200).json({ status: 'true', data: fundingReceived.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

module.exports = { create, update, deleteFundingReceived, getDetails };
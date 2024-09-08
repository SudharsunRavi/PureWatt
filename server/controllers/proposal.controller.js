const pool=require('../DBconnection');

const create = async (req, res) => {
    const {location, description, photo, createdby, createdat}=req.body;
    try {
        const newProposal = await pool.query(
            'INSERT INTO proposal (location, description, photo, createdby, createdat) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [location, description, photo, createdby, createdat]
        );
        await pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newProposal.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const update = async (req, res) => {
    const {proposalid, location, description, photo, createdby, createdat}=req.body;
    try {
        const newProposal = await pool.query(
            'UPDATE proposal SET location = $2, description = $3, photo = $4, createdby = $5, createdat = $6 WHERE proposalid = $1 RETURNING *',
            [proposalid, location, description, photo, createdby, createdat]
        );
        await pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newProposal.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const deleteProposal = async (req, res) => {
    const {proposalid}=req.body;
    try {
        await pool.query('DELETE FROM proposal WHERE proposalid = $1', [proposalid]);
        await pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Proposal deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

const getDetails = async (req, res) => {
    try {
        const proposal = await pool.query('SELECT * FROM proposal');
        return res.status(200).json({ status: 'true', data: proposal.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status:"false", message: error.message });
    }
}

module.exports={create, update, deleteProposal, getDetails};
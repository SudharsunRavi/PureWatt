const pool=require('../DBconnection');

const create = async (req, res) => {
    const {name, location, installedcapacitymw, type, startdate, ownedby, plantmanagerid, createdby, modifiedat} = req.body;
    try {
        const newPowerplant = await pool.query(
            'INSERT INTO powerplant (name, location, installedcapacitymw, type, startdate, ownedby, plantmanagerid, createdby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, location, installedcapacitymw, type, startdate, ownedby, plantmanagerid, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newPowerplant.rows[0] });       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const update = async (req, res) => {
    const { powerplantid, name, location, installedcapacitymw, type, startdate, ownedby, plantmanagerid, createdby, modifiedat } = req.body;
    console.log("Request Body:", req.body);

    try {
        const updatedPowerplant = await pool.query(
            `UPDATE powerplant 
             SET name = $2, location = $3, installedcapacitymw = $4, type = $5, startdate = $6, 
                 ownedby = $7, plantmanagerid = $8, createdby = $9, modifiedat = $10 
             WHERE powerplantid = $1 
             RETURNING *`,
            [powerplantid, name, location, installedcapacitymw, type, startdate, ownedby, plantmanagerid, createdby, modifiedat]
        );

        if (updatedPowerplant.rowCount === 0) {
            return res.status(404).json({ status: 'false', message: "Powerplant not found" });
        }
        console.log("Updated Powerplant:", updatedPowerplant.rows[0]);

        return res.status(201).json({ status: 'true', data: updatedPowerplant.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}


const deletePowerplant = async (req, res) => {
    const {powerplantid} = req.body;
    try {
        await pool.query('DELETE FROM powerplant WHERE powerplantid = $1', [powerplantid]);
        pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Powerplant deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const getDetails = async (req, res) => {
    try {
        const powerplant = await pool.query('SELECT * FROM powerplant');
        return res.status(200).json({ status: 'true', data: powerplant.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

module.exports = { create, update, deletePowerplant, getDetails };
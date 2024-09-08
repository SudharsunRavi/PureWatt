const pool=require('../DBconnection');

const create=(req,res)=>{
    const {plantid, waterflowrate, headheight, turbineefficiency, plantavailability, createdby, modifiedat} = req.body;
    try {
        const newHydropower = pool.query(
            'INSERT INTO hydropower (plantid, waterflowrate, headheight, turbineefficiency, plantavailability, createdby, modifiedat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [plantid, waterflowrate, headheight, turbineefficiency, plantavailability, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newHydropower.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const update=(req,res)=>{
    const {hydropowerplantid, plantid, waterflowrate, headheight, turbineefficiency, plantavailability, createdby, modifiedat} = req.body;
    try {
        const newHydropower = pool.query(
            'UPDATE hydropower SET plantid = $2, waterflowrate = $3, headheight = $4, turbineefficiency = $5, plantavailability = $6, createdby = $7, modifiedat = $8 WHERE hydropowerplantid = $1 RETURNING *',
            [hydropowerplantid, plantid, waterflowrate, headheight, turbineefficiency, plantavailability, createdby, modifiedat]
        );
        pool.query('COMMIT');
        return res.status(201).json({ status: 'true', data: newHydropower.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const deleteHydropower=(req,res)=>{
    const {hydropowerplantid} = req.body;
    try {
        pool.query('DELETE FROM hydropower WHERE hydropowerplantid = $1', [hydropowerplantid]);
        pool.query('COMMIT');
        return res.status(200).json({ status: 'true', message: 'Hydropower plant deleted' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

const getDetails=(req,res)=>{
    try {
        const hydropower = pool.query('SELECT * FROM hydropower');
        return res.status(200).json({ status: 'true', data: hydropower.rows });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'false', message: error.message });
    }
}

module.exports={create, update, deleteHydropower, getDetails};
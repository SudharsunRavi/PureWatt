const pool = require('../DBconnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    try {
        const { name, email, phonenumber, city, pincode, role, createdat, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pool.query(
            "INSERT INTO users (name, email, phonenumber, city, pincode, role, createdat, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [name, email, phonenumber, city, pincode, role, createdat, hashedPassword]
        );
        const {password:pass, ...userInfo} = user.rows[0];
        return res.status(200).json({status:"true", userInfo});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(400).json({ status:"false", message: "Invalid Credentials" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).json({ status:"false", message: "Invalid Credentials" });

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        const { password: pass, ...userInfo } = user.rows[0];
        return res.status(200).json({ status:"true", userInfo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { userid } = req.params;
    const { name, email, phonenumber, city, pincode, role, createdat, password } = req.body;

    try {
        await pool.query('BEGIN');
        const userCheck = await pool.query('SELECT * FROM users WHERE userid = $1', [userid]);

        if (userCheck.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        let query = 'UPDATE users SET ';
        const params = [];

        // Username
        if (name !== undefined) {
            query += 'name = $1, ';
            params.push(name);
        } else {
            query += 'name = $1, ';
            params.push(userCheck.rows[0].name);
        }

        // Phone Number
        if (phonenumber !== undefined) {
            query += 'phonenumber = $2, ';
            params.push(phonenumber);
        } else {
            query += 'phonenumber = $2, ';
            params.push(userCheck.rows[0].phonenumber);
        }

        // City
        if (city !== undefined) {
            query += 'city = $3, ';
            params.push(city);
        } else {
            query += 'city = $3, ';
            params.push(userCheck.rows[0].city);
        }

        // Pincode
        if (pincode !== undefined) {
            query += 'pincode = $4, ';
            params.push(pincode);
        } else {
            query += 'pincode = $4, ';
            params.push(userCheck.rows[0].pincode);
        }

        // Email
        if (email !== undefined) {
            query += 'email = $5, ';
            params.push(email);
        } else {
            query += 'email = $5, ';
            params.push(userCheck.rows[0].email);
        }

        // Created At
        if (createdat !== undefined) {
            query += 'createdat = $6, ';
            params.push(createdat);
        } else {
            query += 'createdat = $6, ';
            params.push(userCheck.rows[0].createdat);
        }

        // Password
        if (hashedPassword) {
            query += 'password = $' + (params.length + 1) + ', ';
            params.push(hashedPassword);
        }

        if (role !== undefined) {
            query += 'role = $7, ';
            params.push(role);
        } else {
            query += 'role = $7, ';
            params.push(userCheck.rows[0].role);
        }

        query = query.slice(0, -2);
        query += ' WHERE userid = $' + (params.length + 1) + ' RETURNING *';
        params.push(userid);

        const result = await pool.query(query, params);
        await pool.query('COMMIT');

        const { password: _, ...userInfo } = result.rows[0];
        res.json({ status: 'true', userInfo });
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ status: 'false', message: err.message });
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    const { userid } = req.params;

    try {
        await pool.query('BEGIN');
        const userCheck = await pool.query('SELECT * FROM users WHERE userid = $1', [userid]);

        if (userCheck.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        await pool.query('DELETE FROM users WHERE userid = $1', [userid]);
        await pool.query('COMMIT');

        res.json({ status: 'true', message: 'User deleted' });
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ status: 'false', message: err.message });
        console.log(err);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        const data = users.rows;
        res.json({status: 'true', data});
    } catch (err) {
        res.status(500).json({ status: 'false', message: err.message });
        console.log(err);
    }
}

module.exports = {registration, login, updateUser, deleteUser, getUsers};
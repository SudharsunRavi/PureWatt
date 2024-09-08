const express = require('express');
const dotenv = require('dotenv').config();
const pool = require('./DBconnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const userRoute = require('./routes/users.route');
const proposalRoute = require('./routes/proposal.route');
const financialParamsRoute = require('./routes/financialparameters.route');
const fundingReceivedRoute = require('./routes/fundingreceived.route');
const windRoute = require('./routes/wind.route');
const solarRoute = require('./routes/solar.route');
const geothermalRoute = require('./routes/geothermal.route');
const hydropowerRoute = require('./routes/hydropower.route');
const powerplantRoute = require('./routes/powerplant.route');

app.use('/api/users', userRoute);
app.use('/api/proposal', proposalRoute);
app.use('/api/financialparams', financialParamsRoute);
app.use('/api/fundingreceived', fundingReceivedRoute);
app.use('/api/wind', windRoute);
app.use('/api/solar', solarRoute);
app.use('/api/geothermal', geothermalRoute);
app.use('/api/hydropower', hydropowerRoute);
app.use('/api/powerplant', powerplantRoute);

app.listen(5000, () => {
    console.log('Server running');
});
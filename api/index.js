const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const pageRoutes = require('./routes/pageRoutes');
app.use('/pages', pageRoutes);

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
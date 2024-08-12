const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001;

// Povezivanje sa bazom podataka
const db = require('./models'); // Ovo će automatski učitati index.js iz models direktorijuma

// Sinkronizacija baze podataka
db.sequelize.sync().then(() => {
  console.log('Baza podataka je sinhronizovana.');
}).catch((err) => {
  console.error('Došlo je do greške prilikom sinhronizacije baze podataka:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importovanje ruta
const apiRoutes = require('./routes/api');

// Koristi rute
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server radi na http://localhost:${port}`);
});

// backend/index.js
const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
// const { educationHistory, skills, projects } = require('./data');
const app = express();
const PORT = 3000;
app.use(cors());
app.use('/images', express.static('images'));

app.use(express.json());
// app.get('/api/education', (req, res) => res.json(educationHistory));
// app.get('/api/skills', (req, res) => res.json(skills));
// app.get('/api/projects', (req, res) => res.json(projects));

app.get('/api/education', async (req, res) => {
try {
const { rows } = await sql`SELECT * FROM education ORDER BY period
DESC;`;
res.status(200).json(rows);
} catch (error) {
res.status(500).json({ error: 'Gagal mengambil data pendidikan' });
}
});
app.get('/api/skills', async (req, res) => {
try {
const { rows } = await sql`SELECT * FROM skills;`;
res.status(200).json(rows);
} catch (error) {
res.status(500).json({ error: 'Gagal mengambil data skill' });

}
});
app.get('/api/projects', async (req, res) => {
try {
const { rows } = await sql`SELECT * FROM projects;`;
res.status(200).json(rows);
} catch (error) {
res.status(500).json({ error: 'Gagal mengambil data proyek' });
}
});


app.listen(PORT, () => {
console.log(` Server backend berjalan di http://localhost:${PORT}`);
});



module.exports = app;


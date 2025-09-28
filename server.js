const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Підключення до PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'feedback_db',
    password: 'lizaliza123',
    port: 5432,
});

// Перевірка з'єднання
pool.connect()
    .then(() => console.log('Підключено до бази даних PostgreSQL'))
    .catch(err => console.error('Помилка підключення до БД', err));

// POST запит для збереження відгука
app.post('/api/feedback', async (req, res) => {
    const { user, comment } = req.body;

    // Перевірка на пусті поля
    if (!user || !comment || !user.trim() || !comment.trim()) {
        return res.status(400).json({ message: 'Поля "user" и "comment" не можуть бути пустими' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO feedbacks (user_name, comment) VALUES ($1, $2) RETURNING id',
            [user, comment]
        );

        // Відповідь з id відгука
      //  res.status(200).json({ message: 'Відгук збережено', feedbackId: result.rows[0].id });
        res.status(200).send('Відгук збережено');

    } catch (err) {
        console.error('Помилка збереження відгука', err.message);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// GET запит для отримання всіх відгуків
app.get('/api/feedback', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT user_name AS user, comment FROM feedbacks ORDER BY id DESC'
        );

        res.json(result.rows);
    } catch (err) {
        console.error(' Помилка про отриманні відгука:', err.message);
        res.status(500).json({ message: 'Помилка на сервері' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущено на сервері ${port}`);
});

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Psldraft@61260',
  database: 'notes_app',
  waitForConnections: true
});

app.get('/api/notes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notes ORDER BY updated_at DESC');
    const [tags] = await pool.query('SELECT note_id, tag FROM note_tags');
    const tagMap = {};
    for (const { note_id, tag } of tags) {
      (tagMap[note_id] ??= []).push(tag);
    }
    res.json(rows.map(n => ({ ...n, tags: tagMap[n.id] ?? [] })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { id, title, body, created_at, updated_at, tags = [] } = req.body;
    await pool.query(
      'INSERT INTO notes (id, title, body, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [id, title, body, created_at, updated_at]
    );
    if (tags.length) {
      await pool.query('INSERT INTO note_tags (note_id, tag) VALUES ?', [tags.map(t => [id, t])]);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, body, updated_at, tags } = req.body;
    if (title !== undefined) {
      await pool.query(
        'UPDATE notes SET title=?, body=?, updated_at=? WHERE id=?',
        [title, body, updated_at, id]
      );
    }
    if (tags !== undefined) {
      await pool.query('UPDATE notes SET updated_at=? WHERE id=?', [updated_at, id]);
      await pool.query('DELETE FROM note_tags WHERE note_id=?', [id]);
      if (tags.length) {
        await pool.query('INSERT INTO note_tags (note_id, tag) VALUES ?', [tags.map(t => [id, t])]);
      }
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM notes WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Notes App running on http://localhost:3000'));

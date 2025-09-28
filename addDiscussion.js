const db = require('./db');

const addDiscussion = (user, comment) => {
    const stmt = db.prepare('INSERT INTO discussions (user, comment) VALUES (?, ?)');
    stmt.run(user, comment, (err) => {
        if (err) {
            console.error('error', err.message);
        } else {
            console.log('successful');
        }
    });
    stmt.finalize();
};

addDiscussion('User1', 'this comment for discusion');

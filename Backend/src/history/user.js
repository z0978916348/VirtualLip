// require('../../config.js');
// if (!global.db) {
//     const pgp = require('pg-promise')();
//     db = pgp(process.env.DB_URL);
// }

// function create(username, lipstick_name, color) {
//     const sql = `
//         INSERT INTO appuser(username, lipstick_name, color)
//         VALUES ($1, $2, $3)
//         RETURNING *
//     `;
//     return db.one(sql, [username, lipstick_name, color]);
// }

// function getinfo(username) {
//     const sql = `
//         select u.lipstick_name, u.color from appuser u where username = $1
//     `;
//     //console.log(db.any(sql, [username]))
//     return db.any(sql, [username]);
// }

// exports.create = create
// exports.getinfo = getinfo
const { Client } = require('pg')
const client = new Client({
    user: 'kevin',
    host: 'localhost',
    database: 'lipstick',
    password: 'a123',
    port: 5432,
})
client.connect()
create_text = 'INSERT INTO appuser(username, lipstick_name, color) VALUES ($1, $2, $3) RETURNING *'
getinfo_text = 'select u.lipstick_name, u.color from appuser u where username = $1'

async function create(username, lipstick_name, color) {
    // client.query(getinfo_text, [username]).then(
    //     (resolve) => {
    //         console.log(`user: ${resolve.rowCount}`)
    //         return resolve.rows
    //     }
    // ).catch(e => console.error(e.stack))
    
    
    
    
    try {
        let duplicate = false
        const res1 = await client.query(getinfo_text, [username])
        //console.log(`res1_rowsCount: ${res1.rowCount}`)
        for (let i=0; i<res1.rowCount; i++) {
            //console.log(`lipstick_name: ${res1.rows[i].lipstick_name}`)
            if (res1.rows[i].lipstick_name == lipstick_name) {
                if (res1.rows[i].color == color) {
                    duplicate = true
                }
            }
        }
        if (!duplicate) {
            const res2 = await client.query(create_text, [username, lipstick_name, color])
        }
    } catch (err) {
        console.log(err.stack)
    }
}

async function getinfo(username) {
    console.log(`user_name: ${username}`)
    return client.query(getinfo_text, [username]).then(
        (resolve) => {
            console.log(`user: ${resolve.rowCount}`)
            return resolve.rows
        }
    ).catch(e => console.error(e.stack))
    
    // try {
    //     const res = await client.query(getinfo_text, [username])
    //     console.log(`user: ${res.rowCount}`)
    //     return res;
    // } catch (err) {
    //     console.log(err.stack)
    // }
}

exports.create = create
exports.getinfo = getinfo
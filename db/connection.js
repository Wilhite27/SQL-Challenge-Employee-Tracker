const mysql = require('mysql2');

// connecting to database
const connection = mysql.createConnection({
    host: "localhost",
    // PORT: 3001,
    user: "root",
    password: "root",
    database: "tracker_db",
});



connection.connect(function(error) {
    if(error) throw error;

})
// async database constructor
// // class Database {
//     constructor(config)  {
//         this.connection = mysql.createConnection(config);
//     }

//     // constructor creates a new mysql connection with this configuration
//     query(sql, args) {
//         return new Promise ((resolve, reject) => {
//             this.connection.query(sql, args, (error, rows) => {
//                 if (error) {
//                     console.log(error.sql)
//                     reject(error)
//                 } else {
//                     resolve(rows)
//                 }
//             })
//         })
//     }
//     close () {
//         return new Promise((resolve, reject) => {
//             this.connection.end(error => {
//                 if (error) {
//                     reject(error)
//                 } else {
//                     resolve()
//                 }
//             })
//         })
//     }
// };

module.exports = connection;

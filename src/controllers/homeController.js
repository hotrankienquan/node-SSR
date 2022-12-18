
import pool from "../config/connectDb";
let getHomepage =async (req, res) => {
  // logic 
  let data = []
  // connection.query(
  //   'SELECT * FROM `users`',
  //   function (err, results, fields) {
     
  //     results.map(row => { 
  //       data.push({
  //         id: row.id,
  //         firstname:row.firstname
  //      })
  //     })
      
  //     return res.render('index.ejs',{dataUser: JSON.stringify(data)});
  //   }

  // );
  const [rows, fields] = await pool.execute('select * from users');
  return res.render('index.ejs', { dataUser: rows });
  console.log('>>> check rows', rows)
}
let getDetailUser = async (req, res) => {
  let id = req.params.idUser;
  const user = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
  console.log(">>check rows", user[0])
  return res.send(JSON.stringify(user[0]))
  // return res.render('index.ejs', { dataDetail: user[0] })
  // return res.render('index.ejs', { dataUser: rows });

}
let createNewUser = async (req, res) => {
  const {firstname, lastname, email, address } = req.body;
  await pool.execute('insert into users(firstname,lastname,address,email) values(?,?,?,?)', [firstname,lastname,address,email]);
  console.log(">> check req", req.body)
  return res.redirect('/')
}
let deleteUser = async (req, res) => {
  let id = req.params.id
  await pool.execute('delete from users where id = ?', [id])
  return res.redirect("/")
  console.log(">> check ", req.params.id)
}
let editUser = async (req, res) => {
  let idEdit = req.body.idEdit
 let data =  await pool.execute('select * from users where id = ? limit 1', [idEdit])
  return res.render('edituser.ejs', {data:data[0]})
  console.log(">> check body", req.body)
}
let updateUser = async (req, res) => {
  let { firstname, lastname, email, address, idInput } = req.body
  await pool.execute('update users set firstname = ?,lastname=?,email=?,address=? where id = ?', [firstname, lastname, email, address, idInput])
  return res.redirect('/')
  console.log(">> check body", req.body)
} 
module.exports = {
  getHomepage, getDetailUser
  , createNewUser,
  deleteUser, editUser, updateUser
};
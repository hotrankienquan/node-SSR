import pool from "../config/connectDb";

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute('select * from users');
  return res.status(200).json({
    message: 'ok',
    data: rows
  })
}

let updateUser = async (req, res) => {
  let { firstname, lastname, email, address, idInput } = req.body
 let [rows,fields] =  await pool.execute('update users set firstname = ?,lastname=?,email=?,address=? where id = ?', [firstname, lastname, email, address, idInput])
  return res.status(200).json({
    message: 'update success',
    data: rows
  })
}
let addNewUser = async (req, res) => {
  const { firstname, lastname, email, address } = req.body;
  let [rows,fields] = await pool.execute('insert into users(firstname,lastname,address,email) values(?,?,?,?)', [firstname, lastname, address, email]);
  return res.status(200).json({
    message: 'ok',
    data: rows,
    fields: fields
  })
}
let deleteUser = async (req, res) => {
  let id = req.params.id
  await pool.execute('delete from users where id = ?', [id])
  return res.status(200).json({
    mes: 'delete ok',
  })
}
module.exports = {
  getAllUsers,
  updateUser,
  addNewUser,
  deleteUser
}
const express = require('express');
const router = express.Router();
require('../util/functions');
require('../util/constants');

router.post("/password_authenticate", function (req, res, next) {
    const id = req.body.id;
    const password = encrypt(req.body.password.toString());
    const query = `SELECT id from user_def where password = '${password}' and id = ${id}`;
    db.query(query)
      .then((result) => {
        if (result && result.length !== 0) {
          res.status(200).json({
            success: true,
            data: result,
          });
        }else{
          res.status(500).json({
            success: false,
            msg: "Username and Password Does Not Match",
          });
        }        
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: SERVER_ERROR });
      });
  });


router.get("/user_balance", function (req, res, next) {
    const id = req.query.id;
    const query = `SELECT COALESCE((
      SELECT balance
      FROM account_def
      WHERE user_id = ${id}
      ORDER BY inserted_date DESC
      LIMIT 1
      ), 0) as balance`;
      console.log(query);
    db.query(query)
      .then((result) => {
        if (result && result.length !== 0) {
          res.status(200).json({
            success: true,
            data: result,
          });
        }else{
          res.status(500).json({
            success: false,
            msg: "customer not found",
          });
        }        
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: SERVER_ERROR });
      });
  });

module.exports = router;

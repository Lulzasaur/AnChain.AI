/** API routes. */
const express = require("express");
const router = new express.Router();
const axios = require('axios');
const url = 'http://54.214.159.14:5000/chartA';

/** GET /     simple GET request to server
 *
 *
 */

router.get("/", async (req, res, next) => {
  try {
    let result = await axios({
      method:'get',
      url,
      params:{
        chart:`months`
      }
    })
    
    return res.json(result.data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

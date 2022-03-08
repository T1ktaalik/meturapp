const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('forgeviewer')
    //res.render('potreeviewer')
})

module.exports = router;
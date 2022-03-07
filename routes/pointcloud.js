const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    //res.send('is checking the path!')
    res.render('potreeviewer')
})

module.exports = router;
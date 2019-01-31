const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=> {
    const io = req.app.get('io');
    io.emit('test','음');
    return res.render('main')
});

module.exports = router;
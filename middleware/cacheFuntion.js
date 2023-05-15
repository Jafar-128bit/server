const {getFromCache} = require('../controllers/cacheController');

exports.checkCacheHeapBoard = (req, res, next) => {
    const cacheKey = req.body.userId;
    const cacheData = getFromCache(cacheKey);
    try {
        cacheData ? res.status(200).jsonp({code: 200, message:"Data from Cache Memory!", results: cacheData}) : next();
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({code: 500, errorMassage: error});
    }
};

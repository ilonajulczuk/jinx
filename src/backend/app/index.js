var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./models/bear');
var Site = require('./models/site');

mongoose.connect('mongodb://localhost/');
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/bears')
    .post(function(req, res) {
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Bear created! Name ' + bear.name});
        });
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if(err) {
                res.send(err);
            }
            res.json(bears);
        });
    });

router.route('/bears/:bear_id')
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) {
                res.send(err);
            }
            res.json(bear);
        });
    })
    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) {
                res.send(err);
            }

            bear.name = req.body.name;
            bear.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Bear updated!'});
            });
        });
    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted'});
        });
    });

function updateSite(site, data) {
    site.name = data.name;
    site.address = data.address;
    site.cname = data.cname;
    site.active = data.active;
}

router.route('/sites')
    .post(function(req, res) {
        var site = new Site();
        updateSite(site, req.body);

        site.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Site created! Name ' + site.name});
        });
    })
    .get(function(req, res) {
        Site.find(function(err, sites) {
            if(err) {
                res.send(err);
            }
            res.json(sites);
        });
    });

router.route('/sites/:site_id')
    .get(function(req, res) {
        Site.findById(req.params.site_id, function(err, site) {
            if (err) {
                res.send(err);
            }
            res.json(site);
        });
    })
    .put(function(req, res) {
        Site.findById(req.params.site_id, function(err, site) {
            if (err) {
                res.send(err);
            }

            updateSite(site, req.body);
            site.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'site updated!'});
            });
        });
    })
    .delete(function(req, res) {
        Site.remove({
            _id: req.params.site_id
        }, function(err, site) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted'});
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Starting app on port ' + port);

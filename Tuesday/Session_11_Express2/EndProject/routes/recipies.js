var recipies = require('../data/recipiesData.js');

exports.list = function (req, res) {
    //get the name of the kind of recipies that was requested
    var parts = req.originalUrl.split('/');
    var kind = parts[parts.length - 1];

    res.render('recipie', {
        recipies: {
            list: recipies[kind],
            kind: recipies.recipeTypeName[kind] + ' Recipies'
        }
    });

}
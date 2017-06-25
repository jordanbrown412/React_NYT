var require = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String
    },
    date: {
    type: Dat
},
    url: {
     type: String   
    }
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;


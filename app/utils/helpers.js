var axios = require('axios');

var nytApi = "84acc639b7af470facdac4d12ca2b946";

var helpers = {

        query: function(search, begin, end) {
            
            

    // Creating queryUrl for Axios to use
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // making API call with Axios

    return axios.get(queryUrl, {
            params: {
            'q': search.trim(),
            'begin_date': begin.trim(),
            'end_date': end.trim(),
            'api-key': nytApi
            }
    }).then(function(response) {

        console.log(response);
        var results = response.response.docs;
       
            
        })
    },

        getHistory: function() {
            return axios.get("/api");
        },

        postHistory: function() {
            return axios.post("/api", {});
        }
    };

    module.exports = helpers;
    


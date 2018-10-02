var request = require('request');
var secret = require('./secret');


// request('URL', function(err, response, body){
//     if (err){
//         console.log('WRONG', err);
//         return false
//     }
// })

      // getRepoContributors(url, function(err, res, body)
// function getRepoContributors(repoOwner, repoName, cb) {
    // request.get('https://api.github.com/repos/jquery/jquery/contributors')
    //     .on('error', function(err){
    //         console.log('Failure');
    //     })

    //     .on('response', function(response){
    //         console.log(repoOwner);
    //         console.log(repoName);
    //     })

    //     .on('end', function(){
    //         console.log('Run operation completed.')
    //     })

// var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': "token " + secret.GITHUB_TOKEN
        }
    }

// Request is designed to be the simplest way possible to make HTTP calls.
    request(options, function(err, res, body) {
        if (err){
            console.log('Errors:', err)
        } else {
            var json = JSON.parse(body);        // array of objects
            cb(null, findURLs(json));
            
        }
    })

    function findURLs(json) {
        var newArray = []
        json.forEach(function(element){
        newArray.push(element.avatar_url);
        })
        return newArray;
    }
}



    // callback
//     request(url, function(err, res, body) {
//         cb(err, body);
//     })
// }


// TEST VALUES
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});
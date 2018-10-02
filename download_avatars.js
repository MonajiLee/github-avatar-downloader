var request = require('request');
var secret = require('./secret');
var fs = require('fs');

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


function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': "token " + secret.GITHUB_TOKEN
        }
    }

    request(options, function(err, res, body) {
        if (err){
            console.log('Errors:', err)
        } else {
            var json = JSON.parse(body);
            cb(null, findURLs(json));           // why do we use cb vs downloadImageByURL?
        }
    })

    function findURLs(json) {
        json.forEach(function(element){
            downloadImageByURL(element.avatar_url, 'avatars/' + element.login + '.jpg');
        })
    }
}

// cb loops through each item in the array:
// It constructs a file path using the login value (e.g., "avatars/dhh.jpg")
// It then passes the avatar_url value and the file path to downloadImageByURL

function downloadImageByURL(url, filePath) {
    let downloadURL = request.get(url).pipe(fs.createWriteStream(filePath));
    return downloadURL;
}


// downloadImageByURL("https://avatars3.githubusercontent.com/u/1199584?v=4", "avatars/rosy.jpg")


getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});
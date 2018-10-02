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

const repoOwner = process.argv[2];
const repoName = process.argv[3];

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
            // var json = JSON.parse(body);
            cb(null, JSON.parse(body));           // why do we use cb vs downloadImageByURL?
        }
    })

    function findURLs(json) {
        json.forEach(function(element){
            let imagePath = 'avatars/' + element.login + '.jpg'
            downloadImageByURL(element.avatar_url, imagePath);
        })
    }
}

function downloadImageByURL(url, filePath) {
    let downloadURL = request.get(url).pipe(fs.createWriteStream(filePath));
    return downloadURL;
}


getRepoContributors(repoOwner, repoName, function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});
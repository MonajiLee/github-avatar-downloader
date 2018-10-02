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


// function getRepoContributors(repoOwner, repoName, cb) {
//     var options = {
//         url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//         headers: {
//             'User-Agent': 'request',
//             'Authorization': "token " + secret.GITHUB_TOKEN
//         }
//     }

//     request(options, function(err, res, body) {
//         if (err){
//             console.log('Errors:', err)
//         } else {
//             var json = JSON.parse(body);        // array of objects
//             cb(null, findURLs(json));
            
//         }
//     })

//     function findURLs(json) {
//         var newArray = []
//         json.forEach(function(element){
//         newArray.push(element.avatar_url);
//         })
//         return newArray;
//     }
// }

function downloadImageByURL(url, filePath) {
    // url = 'https://avatars2.githubusercontent.com/u/2741?v=3&s=466'
    // filePath = 'avatars/kvirani.jpg';
    let downloadURL = request.get(url).pipe(fs.createWriteStream(filePath));
    return downloadURL;
}



downloadImageByURL("https://avatars3.githubusercontent.com/u/1199584?v=4", "avatars/rosy.jpg")

// TEST VALUES
// getRepoContributors("jquery", "jquery", function(err, result) {
//     console.log("Errors:", err);
//     console.log("Result:", result);
// });
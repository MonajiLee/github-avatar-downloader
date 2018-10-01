var request = require('request');

// request('URL', function(err, response, body){
//     if (err){
//         console.log('WRONG', err);
//         return false
//     }
// })


function getRepoContributors(repoOwner, repoName, cb) {
    request.get('https://api.github.com/repos/jquery/jquery/contributors')
    console.log(repoOwner);
    console.log(repoName);
}

// TEST VALUES
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});
var request = require('request');


// request('URL', function(err, response, body){
//     if (err){
//         console.log('WRONG', err);
//         return false
//     }
// })


function getRepoContributors(repoOwner, repoName, cb) {
    request.get('https://api.github.com/repos/jquery/jquery/contributors')
    
    var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
    request(url, function(err, res, body) {
      cb(err, body);
    })
    
    .on('error', function(err){
        console.log('Failure');
    })

    .on('response', function(response){
        console.log(repoOwner);
        console.log(repoName);
    })

    .on('end', function(){
        console.log('Run operation completed.')
    })
}


// TEST VALUES
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});
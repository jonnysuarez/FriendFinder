var friends = require("../data/friends.js");

module.exports = function (app) {
    //display all friends
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
       
        var newFriend = req.body;
        var friendDifferences = [];
        var bestFriend;
        function differenceBetweenFriends(){
            for (var i = 0; i < friends.length; i++){
                var currentFriendTotalDifference = 0;
                for(var j = 0; j < friends[i].scores.length; j++){
                    currentFriendTotalDifference += Math.abs(newFriend.scores[j] - friends[i].scores[j])
                }
                friendDifferences.push(currentFriendTotalDifference);
                console.log(friendDifferences);
            }
        }
        function bestFriend(){
            bestFriend = friendDifferences[0];
            for (var i = 0; i < friendDifferences.length - 1; i++){
                if (friendDifferences[i] < bestFriend){
                    bestFriend = friendDifferences[i];
                }
                console.log(friends[friendDifferences.indexOf(bestFriend)].name);
            }
        }

        
        friends.push(newFriend);

        differenceBetweenFriends();

        bestFriend();

        //console.log(bestFriend.name);

        var newFriend = {
            newFriend: friends[friendDifferences.indexOf(bestFriend)].name,
            newFriendPhoto: friends[friendDifferences.indexOf(bestFriend)].photo
        }

        res.json(newFriend);
    });
}
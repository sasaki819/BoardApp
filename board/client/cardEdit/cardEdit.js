angular.module("app").controller("cardEditController", function($scope,$mdDialog){

    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('Confirmation')
            .textContent('Are you sure delete this card ?')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('cancel!');

        $mdDialog.show(confirm).then(function() {
              $scope.deleteCard();
            }, function() {
              $scope.status = 'You decided to keep your debt.';
            });
          };

    $scope.deleteCard = function(card) {
        console.log("deleteCard called.", $scope._id);
        Meteor.call("cards.remove", $scope.card._id);
//        document.location.href = "main.html";
//        close();
    };

    $scope.close = $mdDialog.cancel;

    $scope.updateCard = function(){
        let newCard;
            newCard = {
                type: $scope.type,
                title: $scope.title,
                content: $scope.content
            };
        console.log("updateCard called.", $scope.content);
        Meteor.call("cards.update", newCard);

    };

    $scope.displayCounter = function(card) {
        if($scope.type=="Stock"){
            return true;
        }else{
            return false;
        }
    };

});
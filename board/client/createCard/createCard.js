angular.module("app").controller("createCardCtrl", function($scope, $mdBottomSheet){
    const typeTodo = 0;
    const typeStock = 1;
    const typeMemo = 2;

    $scope.title = '';
    $scope.checked = false;
    $scope.count = 1;
    $scope.step = 1;
    $scope.unit = '';
    $scope.content = '';

    $scope.close = $mdBottomSheet.cancel;
    $scope.checkError = function() {
        if (!$scope.title) {
            return true;
        }
        if ($scope.selectedType === typeStock) {
            if ($scope.count === undefined || $scope.count < 0) {
                return true;
            }
            if ($scope.step === undefined || $scope.step <= 0) {
                return true;
            }
        }
        return false;
    };
    $scope.reset = function() {
        $scope.title = '';
        $scope.count = 1;
        $scope.step = 1;
        $scope.unit = '';
        $scope.content = '';
    }
    $scope.create = function() {
        let newCard;
        switch ($scope.selectedType) {
            case typeTodo:
                newCard = {
                    type: "Todo",
                    title: $scope.title,
                    checked: false,
                    content: $scope.content
                };
                break; 
            case typeStock:
                newCard = {
                    type: "Stock",
                    title: $scope.title,
                    count: $scope.count,
                    step: $scope.step,
                    unit: $scope.unit,
                    content: $scope.content
                };
                break;
            case typeMemo:
                newCard = {
                    type: "Memo",
                    title: $scope.title,
                    content: $scope.content
                };
                break;
        }
        Meteor.call('cards.add', newCard);
        console.log("cards.add called", newCard);
        $scope.reset();
    };
});

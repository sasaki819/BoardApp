angular.module("app").controller("createCardCtrl", function($mdBottomSheet){
    let ctrl = this;

    const typeTodo = 0;
    const typeStock = 1;
    const typeMemo = 2;

    ctrl.title = '';
    ctrl.checked = false;
    ctrl.count = 1;
    ctrl.step = 1;
    ctrl.unit = '';
    ctrl.content = '';

    ctrl.close = $mdBottomSheet.cancel;
    ctrl.checkError = function() {
        if (!ctrl.title) {
            return true;
        }
        if (ctrl.selectedType === typeStock) {
            if (ctrl.count === undefined || ctrl.count < 0) {
                return true;
            }
            if (ctrl.step === undefined || ctrl.step <= 0) {
                return true;
            }
        }
        return false;
    };
    ctrl.reset = function() {
        ctrl.title = '';
        ctrl.count = 1;
        ctrl.step = 1;
        ctrl.unit = '';
        ctrl.content = '';
    }
    ctrl.create = function() {
        let newCard;
        switch (ctrl.selectedType) {
            case typeTodo:
                newCard = {
                    type: "Todo",
                    title: ctrl.title,
                    checked: false
                };
                break;
            case typeStock:
                newCard = {
                    type: "Stock",
                    title: ctrl.title,
                    count: ctrl.count,
                    step: ctrl.step,
                    unit: ctrl.unit
                };
                break;
            case typeMemo:
                newCard = {
                    type: "Memo",
                    title: ctrl.title,
                    content: ctrl.content
                };
                break;
        }
        Meteor.call('cards.add', newCard);
        console.log("cards.add called");
        ctrl.reset();
    };
});
console.log("createCard.js has loaded");

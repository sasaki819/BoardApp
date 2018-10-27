import counterTemplate from "./counter.html";

angular.module("app").component("counter", {
    templateUrl: counterTemplate,
    controller: function () {
        const ctrl = this;
        ctrl.countUp = function () {
            ctrl.onCountUp();
        };
        ctrl.countDown = function () {
            ctrl.onCountDown();
        };
    },
    bindings: {
        count: "=",
        unit: "<",
        onCountUp: "&",
        onCountDown: "&",
    },
})

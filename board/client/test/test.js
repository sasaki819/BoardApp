import testTemplate from "./test.html";

angular.module("app").component("test", {
    templateUrl: testTemplate,
    controller: function () {
        const ctrl = this;
        ctrl.message = "xxx";
        ctrl.clicked = function () {
            console.log("test.clicked");
        };
    }
});

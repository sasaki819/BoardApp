import toggleIconTemplate from "./toggleIcon.html";

angular.module("app").component("toggleIcon", {
    templateUrl: toggleIconTemplate,
    controller: function ($timeout) {
        const ctrl = this;
        ctrl.onClick = function () {
            ctrl.flag = !ctrl.flag;
            ctrl.onToggle && $timeout(ctrl.onToggle);
        };
        ctrl.iconName = function() {
            return ctrl.flag ? ctrl.on : ctrl.off;
        };
    },
    bindings: {
        flag: "=",
        on: "@",
        off: "@",
        onToggle: "&",
        disabled: "=",
    },
});
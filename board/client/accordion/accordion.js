import accordionTemplate from "./accordion.html";

angular.module("app").component("accordion", {
    transclude: true,
    templateUrl: accordionTemplate,
    controller: function () {
        let ctrl = this;
        this.toggle = function () {
            ctrl.show = !ctrl.show;
            updateProperties();
        };
        function updateProperties() {
            ctrl.tooltip = ctrl.show ? "close" : "open";
            ctrl.iconName = ctrl.show ? "keyboard_arrow_up" : "keyboard_arrow_down";
        }
        ctrl.show = true;
        updateProperties();
    },
    bindings: {
        caption: "<",
    },
});
import accordionTemplate from "./accordion.html";

angular.module("app").component("accordion", {
    transclude: true,
    templateUrl: accordionTemplate,
    controller: function () {
        const ctrl = this;
        this.toggle = function () {
            ctrl.show = !ctrl.show;
            updateProperties();
        };
        function updateProperties() {
            ctrl.tooltip = ctrl.show ? "close" : "open";
            ctrl.iconName = ctrl.show ? "keyboard_arrow_up" : "keyboard_arrow_down";
        }
        ctrl.show = false;
        updateProperties();
    },
    bindings: {
        caption: "<",
    },
});

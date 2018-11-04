import counterTemplate from "./counter.html";

angular.module("app").component("counter", {
    templateUrl: counterTemplate,
    bindings: {
        count: "=",
        unit: "<",
        onCountUp: "&",
        onCountDown: "&",
        disabled: "=",
    },
})

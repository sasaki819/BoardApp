import { connections } from "../imports/models.js";

Meteor.startup(function () {
    console.log("meteor server started");
    connections.remove({});
});

Meteor.onConnection(function (connection) {
    connections.insert({
        connectionId: connection.id,
        username: "",
        timestamp: Date.now(),
    });

    connection.onClose(function () {
        connections.remove({
            connectionId: connection.id
        });
    });
});


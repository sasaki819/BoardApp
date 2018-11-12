import { connections} from "../imports/models.js";

Meteor.startup(function () {
    console.log("meteor server started");
    connections.remove({});
});

Meteor.onConnection(function (connection) {
    console.log("connected:", connection.id, new Date())
    connections.insert({
        connectionId: connection.id,
        username: "",
        timestamp: Date.now(),
    });

    connection.onClose(function () {
        console.log("disconnected:", connection.id, new Date())
        connections.remove({
            connectionId: connection.id
        });
    });
});


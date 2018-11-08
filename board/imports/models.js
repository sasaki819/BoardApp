import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const cards = new Mongo.Collection("cards");
export const connections = new Mongo.Collection("connections");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("cards", function cardsPublication() {
        return cards.find();
    });
    Meteor.publish("users", function usersPublication() {
        return Meteor.users.find();
    });
    Meteor.publish("connections", function connectionsPublication() {
        return connections.find({}, { sort: { timestamp: 1 } });
    });
}

Meteor.methods({
    "cards.add"(newCard) {
        check(newCard, Object);
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        newCard.stared = (newCard.stared || false);
        newCard.private = (newCard.private || false);
        newCard.deleted = (newCard.deleted || false);
        newCard.hasCheckbox = (newCard.hasCheckbox || false);
        newCard.hasCounter = (newCard.hasCounter || false);
        newCard.hasDescription = (newCard.hasDescription || false);
        newCard.checked = (newCard.checked || false);
        newCard.count = (newCard.count || 0);
        newCard.step = (newCard.step || 1);
        newCard.unit = (newCard.unit || "");
        newCard.description = (newCard.description || "");
        newCard.tags = (newCard.tags || []);
        newCard.createdBy = Meteor.user().username;
        newCard.createdAt = new Date();
        newCard.updatedBy = Meteor.user().username;
        newCard.updatedAt = new Date();
        if (newCard.hasCheckbox) {
            newCard.type = "Task"
        } else if (newCard.hasCounter) {
            newCard.type = "Stock"
        } else {
            newCard.type = "Memo"
        }
        cards.insert(newCard);
    },
    "cards.remove"(cardId) {
        check(cardId, String);
        cards.remove(cardId);
    },
    "cards.update"(cardId, data) {
        check(cardId, String);
        check(data, Object);
        data.updatedBy = Meteor.user() && Meteor.user().username || "Guest";
        data.updatedAt = new Date();
        console.log("cards.update", cardId, data);
        cards.update(cardId, {
            $set: data
        });
    },
    "cards.countup"(cardId) {
        check(cardId, String);
        console.log("cards.countup", cardId);
        cards.update(cardId, {
            $inc: {
                count: 1
            },
            $set: {
                updatedBy:Meteor.user() && Meteor.user().username || "Guest",
                updatedAt: new Date(),
            }
        });
    },
    "cards.countdown"(cardId) {
        check(cardId, String);
        console.log("cards.countdown", cardId);
        cards.update(cardId, {
            $inc: {
                count: -1
            },
            $set: {
                updatedBy:Meteor.user() && Meteor.user().username || "Guest",
                updatedAt: new Date(),
            }});
    },
    "ping"() {
        const connectionId = this.isSimulation ? Meteor.connection._lastSessionId : this.connection.id;
        const username = Meteor.user() ? Meteor.user().username : "";
        const timestamp = Date.now();
        connections.update(
            { connectionId, connectionId },
            {
                $set: {
                    username: username,
                    timestamp: timestamp,
                }
            },
            true
        );
    },
});
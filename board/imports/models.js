import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('cards', function cardsPublication() {
        return Cards.find();
    });
}

Meteor.methods({
    'cards.add'(newCard) {
        check(newCard, Object);
        // Make sure the user is logged in before inserting a card
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        newCard.createdAt = new Date();
        newCard.createdBy = Meteor.user().username;
        Cards.insert(newCard);
    },
    'cards.remove'(cardId) {
        check(cardId, String);
        Cards.remove(cardId);
    },
    'cards.setChecked'(cardId, setChecked) {
        check(cardId, String);
        check(setChecked, Boolean);
        Cards.update(cardId, {
            $set: {
                checked: setChecked
            }
        });
    },
});
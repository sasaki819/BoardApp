import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('cards', function cardsPublication() {
        return cards.find();
    });
    Meteor.publish('users', function usersPublication(){
        return Meteor.users.find();
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
        cards.insert(newCard);
    },
    'cards.remove'(cardId) {
        check(cardId, String);
        cards.remove(cardId);
    },
    'cards.setChecked'(cardId, setChecked) {
        check(cardId, String);
        check(setChecked, Boolean);
        cards.update(cardId, {
            $set: {
                checked: setChecked
            }
        });
    },
});
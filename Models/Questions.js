const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    optionOne: {
        type: String,
        required: true,
    },
    optionTwo: {
        type: String,
        required: true,
    },
    optionThree: {
        type: String,
        required: true,
    },
    optionFour: {
        type: String,
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const QuestionsModel = mongoose.model('questions', QuestionsSchema);
module.exports = QuestionsModel;
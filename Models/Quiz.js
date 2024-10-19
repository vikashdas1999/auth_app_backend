const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    quesAns: [
        {
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    required: true
                }
            ],
            correctAnswer: {
                type: String,
                required: true
            }
        }
    ],
    quiz_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
});

const QuizModel = mongoose.model('quiz', QuizSchema);
module.exports = QuizModel;


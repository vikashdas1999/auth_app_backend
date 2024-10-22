const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User ', // Assuming you have a User model
        required: true
    },
    answers: [
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
            },
            userAnswer:{
                type: String,
                required: true
            }
        }
    ],
    score: {
        type: Number,
        default: 0
    },
    quizId : {
        type: Schema.Types.ObjectId,
        ref: 'quizzes',
        required: true
    }
});

const NewUser = mongoose.model('newuser', NewUserSchema);
module.exports = NewUser;
const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();


const Quiz = require('../Models/Quiz');
const NewUser = require('../Models/NewUser'); 
const users = require('../Models/User'); 
// Create a new quiz question
router.post('/quizzes', ensureAuthenticated, async (req, res) => {
    try {

        req.body.quiz_by = req.user._id;
        const quiz = new Quiz(req.body);
        
        await quiz.save();
        res.status(201).send(quiz);
        
    } catch (error) {
        res.status(400).send(error);
    }
});



// Play User new quiz

router.post('/submit-quiz', async (req, res) => {
    const { username, userId, answers , quizId} = req.body; // Assuming answers is an array of user answers

    const quesAns = answers.map(answer => {
        return {
            question: answer.question,
            options: answer.options,
            correctAnswer: answer.correctAnswer,
            userAnswer: answer.userAnswer
        };
    });

    // Calculate score
    const score = quesAns.reduce((total, item) => {
        return total + (item.userAnswer === item.correctAnswer ? 1 : 0);
    }, 0);

    const newUser  = new NewUser({
        username,
        userId,
        answers,
        score,
        quizId
    });

    try {
        await newUser .save();
        res.status(201).json({ message: 'Quiz submitted successfully', score,userId ,id: newUser._id});
    } catch (error) {
        res.status(500).json({ message: 'Error saving quiz data', error });
    }
});



router.get('/quizzes', ensureAuthenticated, async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/quizzes/:quiz_by', async (req, res) => {
    try {
        const { quiz_by } = req.params;
        console.log(quiz_by, 'User ID'); // Log the received user ID
        const quizzes = await Quiz.find({ 'quiz_by': quiz_by }); // Find quizzes by user ID
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ error: 'No quizzes found for this user' });
        }
        res.status(200).send(quizzes);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching quizzes' });
    }
});




router.get('/results/:id', async (req, res) => {
    try {
        const { user_new } = req.params;
        console.log(user_new, 'User ID'); // Log the received user ID
        const quizzes = await NewUser.find({ 'id': user_new }); // Find quizzes by user ID
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ error: 'No quizzes found for this user' });
        }
        res.status(200).send(quizzes);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching quizzes' });
    }
});


router.get('/users/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        console.log(userid, 'User ID');
        
        const userData = await users.find({ '_id': userid }); 

        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});


// Update a quiz question
router.patch('/quizzes/:id', ensureAuthenticated, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) {
            return res.status(404).send();
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a quiz question
router.delete('/quizzes/:id', ensureAuthenticated , async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).send();
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;

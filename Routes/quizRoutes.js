const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();


const Quiz = require('../Models/Quiz');

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



router.get('/quizzes', ensureAuthenticated, async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get a quiz question by ID
// router.get('/quizzes/:quiz_by', ensureAuthenticated, async (req, res) => {
//     try {
//         const { quiz_by } = req.params;
//         console.log(quiz_by,'ID')
//         const quiz = await Quiz.findById(quiz_by);
//         if (!quiz) {
//             return res.status(404).json({ error: 'Quiz not found' });
//         }
//         res.status(200).send(quiz);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching quiz' });

//     }
// });


router.get('/quizzes/:quiz_by', ensureAuthenticated, async (req, res) => {
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

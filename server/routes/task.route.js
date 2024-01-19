const router = require('express').Router();

const taskController = require('../controllers/task.controller');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
//filters
router.get('/status/:status', taskController.getTasksByStatus);
router.get('/search/:keyword', taskController.searchTasks);
router.get('/deadline/:date', taskController.getTasksByDeadline);

router.put('/updateOrder', taskController.updateOrder);
router.put('/updateStatus', taskController.updateStatus);
router.put('/:id', taskController.updateTaskById);
// router.put('updateTaskOrder/:id',)

router.delete('/:id', taskController.deleteTaskById)
module.exports = router;
const route = require('express')();
const userController = require('../controllers/userController');
const upload = require('../config/multer')

route.get('/sample', userController.sampleRoute);
route.get('/todos', userController.listTodo);
route.post('/todos', userController.addTodo);
route.get('/todos/:id', userController.getTodoDetails);
route.put('/todos/:id', userController.updateTodo);
route.delete('/todos/:id', userController.deleteTodo);
route.get('/todo/filter', userController.filterTodo);
route.get('/todo/download', userController.exportTodo);
route.post('/todos/upload', upload.single('file'), userController.importTodo);

module.exports = route


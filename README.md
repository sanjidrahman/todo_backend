# TodoAppBackend

This project was generated with Node.js (Express.js) version 20.6.1

<h2>🚀 Demo</h2>

[https://backendtask-q8k1.onrender.com](https://backendtask-q8k1.onrender.com)   
[https://wasserstofftask-fawn.vercel.app](https://wasserstofftask-fawn.vercel.app) 

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone project</p>

```
git clone https://github.com/sanjidrahman/todo_backend.git
```

<p>2. Install dependencies</p>

```
cd todo_backend
npm install
```
<p>4. Start project</p>

```
npm start
```
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Nodejs (Expressjs)
*   MongoDB
*   Multer
*   Mongoose

### Routes
* `GET /todos` - Retrieve all Todos.
* `GET /todos/:id` - View details of a specific todo. (Replace ':id' with the todo's _id).
* `GET /todo/filter?status=status` - Filter the todos based on pending and completed. (Replace 'status' with pending, completed or all)
* `GET /todo/download` - Download all todos in csv format.
* `POST /todos` -  Create new todo.
* `POST /todos/upload` - Create new todo from csv file.
* `DELETE /todos/:id` -  Delete a specific todo. (Replace ':id' with the todo's _id).
* `PUT /todos/:id` - Update the existing todos. (Replace ':id' with the todo's _id)

## Contact
If you encounter any issues or have any questions, please feel free to contact at [sanjidrahman650@gmail.com](mailto:sanjidrahman650@gmail.com).

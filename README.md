<h1>Todo Api:</h1>
<p>
The todo API allows a user to create, update, and delete a todo. To design the API, I used the MVC structure. In my models, I have a todo model with a Mongoose schema that validates a user's todo. In my routes folder, I have a file that contains a router object with all the endpoints a user can access and the designated action it performs using the todo controller file. My app file instantiates an Express application, adds middleware, and sets the main user routes to the starting path of '/todos/'. In the server file, we establish the connection to MongoDB and also make our server listen for requests.</p>


<h2>How to use the API:</h2>
<ul>
<li>Fork and clone the project</li>
<li>Run npm install</li>
<li>Run npm run dev</li>
<li>While the server is running, you can use Postman to interact with the API. For example:</li>
<li>To get all todos: localhost:3000/todos</li>
<li>To get a single todo (GET): localhost:3000/todos/:id</li>
<li>To create a todo (POST): localhost:3000/todos</li>
<li>To update a todo (PUT): localhost:3000/todos/:id</li>
<li>To delete a todo (DELETE): localhost:3000/todos/:id</li>
</ul>


<h2>Testing</h2>
<h3>Jest & Supertest: run <b>npm run test</b></h3>
<p>I used Jest and Supertest to test my API, ensuring high performance and appropriate error handling. The tests include various scenarios, such as testing edge cases. For example, I checked what happens if a user doesn't input a title field, tries to delete something that is not their own todo, or encounters issues retrieving the wrong todo from the database. The code ensures that these situations are handled properly.</p>
<h2>Load test</h2>
<h3>Artillery: run </h3>
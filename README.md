# ToDoList
To Do List is a web application created using React and Django.

# How To Run
1. Install xampp and run mysql and apache server.
2. Creat mysql database todolist.

3. Activate virtualenv env using cmd 
	[Windows]
	-> cd /env/Scripts/
	-> activate
	
	[Linux]
	-> source /env/bin/activate
	
4. Change directory to where manage.py is present:
	-> cd /todolist/

5. Run these cmds:
	-> python manage.py makemigrations bucket
	-> python manage.py migrate
	-> python manage.py runserver  (Note: use default port 80000)
	
6. In new cmd prompt again activate env.
7. Change directory to where react files are present
	-> cd /react-todolist/react-todolist/
	
8. Run react server using command: 
	-> npm start
	
Check localhost:3000 in your browser !!!

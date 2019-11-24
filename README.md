
# vue-screencasts-vue

### Backend setting:
**1.** Install yarn (node.js is already installed, of course)

**2.** Install Ruby on Rails on your computer. Link for help: https://www.youtube.com/watch?v=LaUDbDUBB-4

**3.** Check in terminal commands:
	```ruby -V```
	```rails -V```
	```gem -V```
	```bundler -V```
	
**4.** If that's all exist open terminal and navigate to backend folder that you have downloaded from github (https://github.com/jeffreybiles/vue-screencasts-server/tree/117d5a666d876650dafee8613c499f270fef3eb4)

**5.** Do a command: ```yarn install```

**6.** Do a command: ```bundle install```

**7.** If there is some issue with gem on windows PCs, open Gemfile and add line: ```gem 'wdm', '>= 0.1.0'```.
Also, if there is issue with version of installed Ruby and Ruby version in Gemfile, change the version in Gemfile and again do ```bundle install```

**8.** Then, if you want to use *sqlite3* (which is Rails default db) db, only do ```rake db:create``` and after that ```rake db:migrate``` command in terminal

**9.** Finally you can started the server with command ```rails server```


* If you want to use *mySQL* maybe, before you do step **8.**, you should make your mysql database (maybe with xampp and *phpmyadmin*, only create database with name you want, and if there some issue with collaboations choose *utf8mb4_unicode_ci*).
Do ```gem install mysql2``` in terminal and add in Gemfile line: ```gem 'mysql2'```. Also comment or delete line: ```gem sqlite3```.
Go to file **config/database.yml**, for ```adapter``` put ```mysql2``` and if your database has username and password put that to:
	```
	adapter: mysql2
	username: root
	password: 1234567
	```
	
(ofc, username and password should have be yours, this is only example). 
In the same file (**database.yml**) for ```database``` delete that ```db/development.sqlite3``` and put your the db name you have created in phpmyadmin (```database: your_database_name```).
Now (while on xampp you are running mySQL) in terminal do ```rake db:create``` and ```rake db:migrate``` commands.
Check your database in *phpmyadmin* (http://localhost/phpmyadmin/), it should create all the tables and rows, but it's empty, you can fill in manually if you want. Here is a data you can put for tags and videos: https://github.com/jeffreybiles/vue-screencasts/tree/with-mirage-backend/src/mirage
Do ```rails server``` for starting the server.



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

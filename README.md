# Flowmodoro
Pomodoro reimagined.

![Current UI of Flowmodoro App during development](./screenshots/developmentUI.png?raw=true "Flowmodoro UI")

## Table Of Contents
- [Flowmodoro](#flowmodoro)
- [Table Of Contents](#table-of-contents)
- [What is this?](#what-is-this-)
- [Technologies](#technologies)
    + [Front-End](#front-end)
    + [Back-End](#back-end)
    + [Hosting](#hosting)
- [Approach](#approach)


## What is this?
As most students do, I found myself not being as productive as I should be and decided to try out the classic Pomodoro technique. While experimenting with this popular productivity method, I found that it was not very effective for me as I would either get distracted before the timer ran out or want to continue working even after the timer ran out. Around this time, I came across a TikTok made by a student in medical school (I will link it here if I end up finding it again) in which he described his method for productivity. In essence, it was a reversal of the Pomodoro technique; you time yourself working for however long you want and your break time is calculated as a ratio of time worked (the TikTok divided time worked by 5). I thought that this was a great idea and decided to start using it and it worked wonders for me. 

For this reason, instead of manually timing and dividing, I decided to create this web application (mobile application coming soon?) that would do this grunt work for me. 

This specific application is technically version 2 of the Flowmodoro application that I created about a year ago. The reason for creating it all over again was because I wanted to implement a to-do list that would be persisted as well as implement some new technologies that I wanted to learn such as Node.js, Express, GraphQL and MongoDB. The previous version was a static site created with vanilla HTML/CSS and JS.  


## Technologies
### Front-End
- React
- Bootstrap
- Apollo ?

### Back-End
- Node.js
- Express.js
- GraphQL
- Mongoose
- MongoDB

### Hosting
- Google Firebase ?
- Heroku ?
- MongoDB Atlas

## Approach
### Timers
The work mode stopwatch timer as well as the break mode countdown timer are implemented using the `setInterval` method built-in to Javascript as well as some state management with React. `React Hooks` are used to persist the state of the time worked as well as other variables such as if the timer has started, if it is break or work mode etc. 

### To-do List
The to-do list UI is created with React using state management with React Hooks. The to-do list tasks are persisted using a GraphQL API with a MongoDB database. As I did not want to require users to authenticate in order to use the to-do list, whenever a user creates a task, the local storage is checked for a unique ID. If there is a unique ID, the user already has data persisted in the backend and can be fetched. If there is not a unique ID in local storage, a new user is created in the database and its unique ID is saved in local storage. This means that user's to-do list tasks will only be persisted if they are using the same browser and they have not cleared their cache. 

### GraphQL API
The GraphQL API consists of the basic CRUD operations to create, read, update and delete tasks from a user as well as creating and deleting a user itself. 




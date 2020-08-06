![Logo](https://user-images.githubusercontent.com/19454480/89396467-71891f00-d6c3-11ea-95ae-0c6c94298f0b.png)

# Tastinder

> Tasty Food + Tinder = Tastinder | Answer the unanswerable question "What should we eat?" created by group indecisiveness

![Issues](https://img.shields.io/github/issues/JapanPanda/tastinder) ![Version](https://img.shields.io/github/v/tag/JapanPanda/tastinder) ![Discord](https://img.shields.io/discord/740497973049425970) ![License](https://img.shields.io/github/license/JapanPanda/tastinder)


## Table of Contents
- [About Tastinder](#about)
- [Installation](#installation)
- [Technologies](#technologies)
- [Contributing](#contributing)

<a name="about"></a>
## About Tastinder
Tastinder aims to solve the issue of group and individual indecisiveness when deciding where to eat!

Whenever someone asks "Hey guys, where do you guys wanna eat?", it often leads to a cycle of "I dunno, I'm fine with anything", "Up to you", "Whatever's okay". This wastes time and can lead to frustration.

With Tastinder, it turns this dilemma into a game by allowing users to host a room where the group members join. Then Tastinder will provide you with restaurants and each member will swipe right for like or swipe left for dislike. At the end of the session, the results of how many likes each restaurant got will be displayed.



## Installation
### Clone
Clone the repo to your desired directory (the below clones it to the tastinder directory)
```bash
git clone https://github.com/JapanPanda/tastinder/ tastinder
```

### Install Packages
Install the necessary packages by running the following

```bash
cd tastinder/tastinder-frontend
npm install
cd ../tastinder-backend
npm install
```
### Change the .env file
Fill out the .env file located within both backend and frontend folders with your own key values.

### Start the server and client
Start the server with

```bash
cd tastinder/tastinder-backend
npm run dev
```
Then the server will be hosted on **localhost:1337** by default.
Start the client with

```bash
cd tastinder/tastinder-frontend
npm run dev
```
Then the client will be hosted on **localhost:3000** by default.


## Technologies
Tastinder uses the following major technologies:
* Node.JS
* Next
* React
* PostgreSQL
* Express

Tastinder prides itself on not utilizing any third party libraries for the front end :) Everything is animated through pure CSS / React.


## Contributing
Contributors are **welcome**. Please join our [Discord](https://discord.gg/bDnscHk) in order to get to know us better.

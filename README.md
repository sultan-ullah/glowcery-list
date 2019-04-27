# Glowcery List
A progressive and dynamic shopping list created using ReactJS and the Local Storage web API

### Usage
Click on a category to add to the item for that specific catergory

The list items are saved per session using the Local Storage API with ReactJS

Full offline usability, load once and use forever (until tab close or refresh)

Click on an item to cross it off your list or delete the item if you do not want it anymore

### Installation
Clone this repository and run the following commands to get it running locally on port 3000

```
npm install
npm run start
```

To build for production run
```
npm run build
```

### Lessons Learned
- Organizing a ReactJS apps into encapsulated components each responsible for its own state/props without needing to be aware of other components
- Events in ReactJS and sending parameters to event handlers
- Using the Local Storage API for (key, value) pairs
- Styling lists and icons

### Live Demo

[Demo](https://frosty-kowalevski-439bcc.netlify.com/)

<img src="https://i.ibb.co/Jkf6D1S/Screen-Shot-2019-04-27-at-12-32-57-PM.png" width="500" height="450" alt="Categories page">

<img src="https://i.ibb.co/g69qMRc/Screen-Shot-2019-04-27-at-12-33-32-PM.png" width="500" height="450" alt="List page">

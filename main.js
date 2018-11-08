const { createStore } = Redux;

const initialState = {
  pups: [
    {
      rating: '5',
      url: 'https://media.giphy.com/media/O3iWjzootMuQw/giphy.gif'
    }
  ],
  ratingDescriptions: {
    '1': "It kinda sucked.",
    '2': "It was just okay.",
    '3': "How can a puppy not be cute?",
    '4': "Super adorable, made my day.",
    '5': "AWESOME!"
  }
}

// Declare action type
/*
- action types should be declared as CONST, because they will not change
- this way, if we call an action and make an error, it will YELL instead of
reaching out to the reducer, which doesn't find a matching action, and
does nothing
- the line where we declare a constant looks superfluous, but it's there for
our own safety.  It could be set to any string, and in fact it doesn't
matter what it's set to - it's used to initialize the constant as equaling
something other than "undefined" so that we can then use the constant to
represent our action going forward
*/
const ADD_PUP = 'ADD_PUP'

// Reducer
/*
    - pure functions which change the content of our store
    - think of the reducer as one long SWITCH statement
*/

/*
  - the equal sign in the arguments isn't magic - it's exactly like a normal
    default value!
  - the second thing being passed in is an OBJECT with 2 keys: type, and variableName.
    This second key is how the reducer knows the name of the variable so that it
    can call it while changing state.  Technically, "action" is an "action OBJECT"
*/

// DEFAULT value
const gifReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PUP:
      const new_pups = state.pups.concat(action.pup)
      // inside our reducer we do NOT have to call .getState() because we have
      // passed in state as an argument
      
      
      return Object.assign({}, state, {
        pups: new_pups
      })
    default:
      return state
  }
  // ...fill in your Reducer code here
}

// Sets up store
const store = createStore(gifReducer);


// Action Creators

/*

  - think of these as creators because they create the OBJECT which will be used
    by the reducer

*/

const addGifToList = newPup => {
  return {
    type: ADD_PUP,
    pup: newPup
  }
}

// EXTRA FUNCTIONS NOT DIRECTLY RELATED TO REDUX
const createDisplayDiv = () => {
  // takes in an object with 2 keys: rating and url
  // creates a div for the url
  gifDiv = document.createElement('div')
  
  // getState() gets the WHOLE state, and then you take what you want out of it
  store.getState().pups.forEach((pupObj) => {
    gifDiv.append(createImageTag(pupObj))
  })
  return gifDiv
}

const createImageTag = pupObj => {
  img = document.createElement('img')
  img.src = pupObj.url
  img.alt = store.getState().ratingDescriptions[pupObj.rating]
  img.className = 'puppyGif'
  
  return img
}

// JS to access new pup form, and gif destination

const newPupForm = document.getElementById('new-pup-form')
const gifList = document.getElementById('gif-list')

// Submits form and dispatches add action

newPupForm.addEventListener('submit', () => {
  event.preventDefault();
  const gifUrl = document.getElementById('gif-url').value
  const gifRating = document.getElementById('gif-rating').value
  document.getElementById('gif-url').value = ''
  document.getElementById('gif-rating').value = ''
  const newPup = { url: gifUrl, rating: gifRating }
  
  // this is the call that goes to the reducer, telling it that an action has been called.
  // it then looks at the actions to find out what it's supposed to be doing with it
  // then the reducer interacts with our store to update state
  
  // usually, we would want to abstract this out into an "action creator", so that
  // it can be called anywhere throughout our app
  
  // store.dispatch(
  //   {
  //     type: ADD_PUP,
  //     newPup: newPup
  //   }
  // )
  
  // abstracted version:
  store.dispatch(addGifToList(newPup))
})



// Renders list of gifs to page

/*
  3 important parts to the render step in Redux.
  
  1. define a render function so that you have what you want to happen on
     initial load and and every time the store updates
  
  then make the magic happen!
  
  2. call your render method so that it happens on initial load
  3. link your render to the store so that it will be called on update

 */
const render = () => {
  // this will happen on every page load and store update
  console.log(store.getState());
  
  gifList.append(createDisplayDiv())
}

render()
store.subscribe(render)

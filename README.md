# Custom hooks
The point of this is to moduolize state, **useEffect**, and callback functions for each event inside a single function.
Put each of this in side a folder call hooks
### Local storage:
```javascript
const[name, setName] = useState(() => window.localStorage.getItem("name") || "")
useEffect(() => {
    window.localStorage.setItem("name", name)
}, [name])
```
### Custom hook: make the above process reusable
```javascript
function useLocalStorageState(key, defaultValue= ""){
    const[state, setState] = useState(() => window.localStorage.getItem(key) || defaultValue)
    useEffect(() => {window.localStorage.setItem(key, state)}, [key, state]);
return [state,setState]
};
const[name, setName] = useLocalStorageState("name)
```
*Note:* Use `JSON.stringify` to automatically convert string to int if applicable

# Lifting State Up
Problem with component is that it receives state, setState and return html Code. 
But what if you want the state on one component affect the other sibling components.
*Solution*: define all state from App, once it pass to each component, setStates would update the state in App, and pass it back to the other component.

# useRef
In React, you cant really use document.selectById("id") to select an element. Unlike html, React render dom and js at the same time, so the element might not be there yet.
```javascript
import React, {useRef} from "react"
const inputRef = useRef();

<input ref={inputRef} type="text" />
```
with this, you basically have access to the input element, and you can do whatever you want with it. 
*Note:* useRef wont change when re render (some event activate)
*Note:* use this for calculation or DOM manipulation, not for state

# useContext
Passing props down to each component is a pain if you have a deep tree, so we use context to pass props down to each component.
```javascript
//Inside App
import createContext from "react"
export const CartContext = createContext();

function App(){
    const [cart, setCart] = useState([]);
    const handleAddToCart = (product) => {setCart([...cart, product]);}
    return (
        <CartContext.Provider value={handleAddToCart}>
            <SideMenu/>
            <MainContent/>
        </CartContext.Provider>
    )
    }

//Inside components/MainContent
import React, {useContext} from "react";
import {CartContext} from "../App";
function MainContent(){
    const handleAddToCart = useContext(CartContext);
    return (
        <div>
            <button onClick={() => handleAddToCart({name: "Apple"})}>Add to cart</button>
        </div>
    )
}
```

using this you dont need intermediate component to pass props down to each component.

# useReducer
simplify use state, put all the state inside a dictionary. Have one function to handle all setState.

### Theory
reducer = (state, action) => newState
action = {type, payload}
dispatch(action) //calls reducer to calculate the new state


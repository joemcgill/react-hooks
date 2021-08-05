// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  const useLocalStorageState = (prop, initialValue = '') => {
    const cachedValue = window.localStorage.getItem(prop);

    const [state, setState] = React.useState(() => {
      if ( cachedValue ) {
        return JSON.parse(cachedValue);
      } else {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }
    });

    React.useEffect(
      () => window.localStorage.setItem(prop, JSON.stringify(state)),
      [prop, state]
    );

    return [state, setState];
  }

  const [name, setName] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Joe Mamma" />
}

export default App

/*  Custom hookit ovat tavallisia Javascript-funktioita, jotka voivat kutsua mitä
    tahansa muita hookeja kunhan vain toimivat hookien sääntöjen puitteissa.
    Custom hookin nimen täytyy alkaa sanalla use.

    Don’t call Hooks inside loops, conditions, or nested functions. Instead,
    always use Hooks at the top level of your React function.

    Don’t call Hooks from regular JavaScript functions. Instead, you can:

    -Call Hooks from React function components.
    -Call Hooks from custom Hooks

    What is a Hook? A Hook is a special function that lets you “hook into”
    React features. For example, useState is a Hook that lets you add React
    state to function components. We’ll learn other Hooks later.

    When would I use a Hook? If you write a function component and realize you
    need to add some state to it, previously you had to convert it to a class.
    Now you can use a Hook inside the existing function component.
  */


import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}
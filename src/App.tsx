import React, { useState } from 'react'
import background from '@images/background.png'
import MyComponent from '@utils/MyComponent'

const App = () => {
    const [count, setCount] = useState(0)

    return (
        <div className='App'>
            {<img src={background} alt='' />}
            <MyComponent></MyComponent>
            <button onClick={() => setCount((c) => c + 1)}>{count}</button>
        </div>
    )
}

export default App

import { useState } from 'react'
import { Text, useTick } from '@inlet/react-pixi'
import { TextStyle } from 'pixi.js';
function RotatingText() {
    const [rotation, setRotation] = useState(0)
    useTick(delta => {
        setRotation(rotation + 0.01 * delta)
    })
    return (
       <Text text="Hello World"
            x={100} 
            y={100}
            rotation={rotation}
            anchor={0.5}
            style={new TextStyle({fill:'white'})} 
      />           
    )
}

export default RotatingText
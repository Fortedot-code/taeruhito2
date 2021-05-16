import { useState } from 'react'
import { Text, useTick} from '@inlet/react-pixi'
import { TextStyle } from 'pixi.js';
function MovingText() {
    const [x, setX] = useState(0)
    const [color, setColor] = useState('white')
    useTick(delta => {
        setX(x + 1 * delta)
    })
    return (
       <Text text="Hello World"
            x={x} 
            y={100}
            anchor={0.5}
            interactive={true}
            style={new TextStyle({fill:color})}
            click={() => {{
              setColor('red')
            }}}
      />           
    )
}

export default MovingText

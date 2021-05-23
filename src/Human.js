import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'
function HumanAnimate() {
    // TODO: 2枚の絵が交互にアニメーションするようロジックを修正
    const [x, setX] = useState(0)
    let counter = 0
    useTick(delta => {
      counter += delta
      let change
      if (counter > 300) {
        counter = 0
        change = true
      } else if (counter > 30) {
        change = true
      } else {
        change = false
      }
      const xVal = change ? 1080 : 0
      setX(xVal)
    })
    const humanImage = `${process.env.PUBLIC_URL}/img/human/01_normal.png`
    return (
      <Sprite
        image={ humanImage }
        scale={{ x: 1, y: 1 }}
        anchor={0.5}
        x={x}
        y={960}
      />
    )
}

export default HumanAnimate

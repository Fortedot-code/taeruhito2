import { useEffect, useState } from 'react'
import { Sprite } from '@inlet/react-pixi'
function HumanAnimate() {
    // 2枚の絵が交互にアニメーション
    const [x, setX] = useState(0)
    useEffect(() => {
      let xVal = 0
      const interval = setInterval(() => {
        xVal = xVal == 0 ? 1080 : 0
        setX(xVal)
      }, 1000);
      return () => clearInterval(interval)
    }, [])
    // let picName = '01_normal'
    let picName = '02_headtap'
    const humanImage = `${process.env.PUBLIC_URL}/img/human/${picName}.png`
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

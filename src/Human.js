import { useEffect, useState } from 'react'
import { Sprite } from '@inlet/react-pixi'
function HumanAnimate() {
    // 2枚の絵が交互にアニメーション
    const [x, setX] = useState(0)
    const [pic, setPic] = useState('01_normal')
    useEffect(() => {
      let xVal = 0
      const interval = setInterval(() => {
        xVal = xVal === 0 ? 1080 : 0
        setX(xVal)
      }, 1000);

      // 4秒おきにアニメーションパターンを変更（試行）
      let picName = '01_normal'
      const interval2 = setInterval(() => {
        if (picName === '01_normal') {
          picName = '02_headtap'
        } else if (picName === '02_headtap') {
          picName = '03_bodytap'
        } else if (picName === '03_bodytap') {
          picName = '01_normal'
        }
        setPic(picName)
      }, 4000);
      return () => clearInterval(interval2)
    }, [])

    return (
      <Sprite
        image={ humanImage(pic) }
        scale={{ x: 1, y: 1 }}
        anchor={0.5}
        x={x}
        y={960}
      />
    )
}

function humanImage(picName) {
  return `${process.env.PUBLIC_URL}/img/human/${picName}.png`
}

export default HumanAnimate

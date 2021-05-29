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
    }, [])

    return (
      <Sprite
        image={ humanImage(pic) }
        scale={{ x: 1, y: 1 }}
        anchor={0.5}
        x={x}
        y={960}
        interactive={true}
        pointerup={() => {{
          setPic(nextPic(pic))
        }}}
      />
    )
}

function nextPic(currentPic) {
  if (currentPic === '01_normal') {
    return '02_headtap'
  } else if (currentPic === '02_headtap') {
    return '03_bodytap'
  } else if (currentPic === '03_bodytap') {
    return '01_normal'
  }
}

function humanImage(picName) {
  return `${process.env.PUBLIC_URL}/img/human/${picName}.png`
}

export default HumanAnimate

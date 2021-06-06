import { useEffect, useState } from 'react'
import { Sprite, Text } from '@inlet/react-pixi'
import { default as PIXI_SOUND } from 'pixi-sound'
import { humanPoint } from './states/rootStates/humanPoint'
import { RecoilRoot, useRecoilState } from 'recoil';

const fight_sound = PIXI_SOUND.sound.Sound.from(`${process.env.PUBLIC_URL}/sound/fight.mp3`)
let not_playing = true

const Counter = () => {
  // atomから状態を取り出す
  const [count, setCount] = useRecoilState(humanPoint)
  useState(() => {
    setCount((c) => c - 1)
  })

  // countが90を下回ると音楽再生
  if (count < 90 && not_playing) {
    not_playing = false
    fight_sound.play()
  }
  return <Text text={count} anchor={0.5} x={150} y={150} interactive={true} click={() => { setCount((c) => c - 1) }} />
}

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
      <RecoilRoot>
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
        <Counter/>
      </RecoilRoot>
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

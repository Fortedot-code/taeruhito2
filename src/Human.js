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

  // countが60を下回ると音楽再生し30を下回ると停止
  if (count < 60 && not_playing) {
    not_playing = false
    fight_sound.play()
  } else if (count < 30 && !not_playing) {
    fight_sound.stop()
  }
  return <Text text={count} anchor={0.5} x={150} y={150} interactive={true} click={() => { setCount((c) => c - 5) }} />
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

    const [accelerationX, setAccelerationX] = useState(0)
    const [accelerationY, setAccelerationY] = useState(0)
    const [accelerationZ, setAccelerationZ] = useState(0)

    const [rotateBeta, setRotateBeta] = useState(0)
    const [rotateGamma, setRotateGamma] = useState(0)
    const [rotateAlpha, setRotateAlpha] = useState(0)

    window.addEventListener("devicemotion", (event) => {
      if (!event.accelerationIncludingGravity || !event.rotationRate) {
        // alert('event.accelerationIncludingGravity is null')
        return;
      }
      setAccelerationX(event.accelerationIncludingGravity.x)
      setAccelerationY(event.accelerationIncludingGravity.y)
      setAccelerationZ(event.accelerationIncludingGravity.z)
      setRotateBeta(event.rotationRate.beta)
      setRotateGamma(event.rotationRate.gamma)
      setRotateAlpha(event.rotationRate.alpha)
    })

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
        <Text text={accelerationX} anchor={0.5} x={150} y={250} interactive={true} />
        <Text text={accelerationY} anchor={0.5} x={150} y={350} interactive={true} />
        <Text text={accelerationZ} anchor={0.5} x={150} y={450} interactive={true} />
        <Text text={rotateBeta} anchor={0.5} x={150} y={550} interactive={true} />
        <Text text={rotateGamma} anchor={0.5} x={150} y={650} interactive={true} />
        <Text text={rotateAlpha} anchor={0.5} x={150} y={750} interactive={true} />
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

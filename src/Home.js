import {React, useEffect, useState} from 'react'
import Modal from 'react-modal'
import { humanPoint } from './states/rootStates/humanPoint'
import { RecoilRoot, useRecoilValue } from 'recoil';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function ModalLogic() {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(true)
  localStorage.setItem('humanPoint', 100)
  localStorage.setItem('gameIsActive', false)
  useEffect(() => {
    const interval = setInterval(() => {
      const hp = localStorage.getItem('humanPoint')
      let gameIsActive = localStorage.getItem('gameIsActive')
      if (!gameIsActive) {
        openModal()
        localStorage.setItem('gameIsActive', true)
        console.log('yes')
      }
      console.log(hp)
      console.log(gameIsActive)
    }, 1000);
  }, [])

  // 加速度センサを許可
  const deviceMotionRequest = () => {
    if (DeviceMotionEvent.requestPermission) {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener("devicemotion", (event) => {
              if (!event.accelerationIncludingGravity) {
                alert('event.accelerationIncludingGravity is null')
                return;
              }
            })
          }
        })
        .catch(console.error);
    } else {
      alert('DeviceMotionEvent.requestPermission is not found')
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    localStorage.setItem('gameIsActive', true)
    deviceMotionRequest()
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>耐える人</h2>
      <button onClick={closeModal}>ゲームスタート</button>
    </Modal>
  )
}

function HomeModal() {
  return (
    <RecoilRoot>
      <div>
        <ModalLogic />
      </div>
    </RecoilRoot>
  )
}

export default HomeModal

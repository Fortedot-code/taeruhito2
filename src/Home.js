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
  // hpが0になったときにmodalを出したい（hpの変更監視ができていない...）
  const count = useRecoilValue(humanPoint)
  console.log(count)
  useEffect(() => {
    console.log(count)
    if (count === 100 && !modalIsOpen) {
      openModal()
    }
  }, count)

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

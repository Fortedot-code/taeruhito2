import './App.css';
import { Stage } from '@inlet/react-pixi'
import RotatingText from './RotatingText'
import MovingText from './MovingText'

function App() {
  return (
    <Stage>
      <RotatingText />
      <MovingText />
    </Stage>
  );
}

export default App;

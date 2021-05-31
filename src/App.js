import './App.css';
import { Stage } from '@inlet/react-pixi'
import Human from './Human'

function App() {
  return (
    <Stage width={1080} height={1920} options={{ backgroundColor: 0xeef1f5 }}>
      <Human />
    </Stage>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 耐える人のライフポイントをRecoilのatomとして作成
const humanPoint = atom({
  key: 'humanPoint',
  default: 100
});

const Counter = () => {
  // atomから状態を取り出す
  const [count, setCount] = useRecoilState(humanPoint);

  return <div onClick={() => setCount((c) => c - 1)}>Clicked: {count}</div>;
};

const App2 = () => (
  <Counter />
)

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <App2 />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

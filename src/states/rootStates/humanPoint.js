import { atom } from 'recoil';

// 耐える人のライフポイントをRecoilのatomとして作成
export const humanPoint = atom({
  key: 'humanPoint',
  default: 100
});

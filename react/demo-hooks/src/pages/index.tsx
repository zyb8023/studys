import styles from './index.less';
import { useWindowSize } from '@/utils/hooks';
import Demo from '@/components';
import MomoDemo from '@/components/MomoDemo';
import { useState } from 'react';

interface IState {
  Com: () => JSX.Element,
  payload: string
}

export default function IndexPage() {
  const win = useWindowSize(window);
  const [ state, setState ]  = useState<IState>({
    Com: Demo,
    payload: '2222'
  });
  console.log(win, '----win');
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <state.Com></state.Com>
      <MomoDemo></MomoDemo>
    </div>
  );
}
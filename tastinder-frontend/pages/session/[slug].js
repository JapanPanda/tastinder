import { useRouter } from 'next/router';
import Card from '../../components/card';
import styles from '../../styles/session.module.scss';
import useWindowDimensions from '../../hooks/windowSizeHook';

const Session = () => {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const sessionId = router.query.slug;

  const 

  return (
    <div className={styles.sessionContainer}>
      <Card width={width} sessionId={sessionId} />
    </div>
  );
};

export default Session;

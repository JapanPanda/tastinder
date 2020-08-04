import Head from 'next/head';
import NavBar from '../components/navbar';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Tastinder - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
    </div>
  );
};

export default Home;

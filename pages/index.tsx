import type { NextPage } from 'next';
import { ImageDropper } from '../components/image/image-dropper';

const Home: NextPage = () => {
  return (
    <>
      <div className='h-screen'>
        <h1 className='text-3xl font-bold underline'>Tailwind CSS!</h1>
        <div className='container mx-auto h-full'>
          <ImageDropper />
        </div>
      </div>
    </>
  );
};

export default Home;

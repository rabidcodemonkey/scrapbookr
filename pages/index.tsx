import type { NextPage } from 'next';
import { ImageUploader } from '../components/image/ImageUploader';
import { Header } from '../components/layout/header';

const Home: NextPage = () => {
  return (
    <>
      <div className='flex h-screen flex-col'>
        <Header />
        <div className='mx-auto flex h-full max-w-5xl flex-col'>
          <div className='my-auto'>
            <ImageUploader uploadUrl='/api/bookr' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

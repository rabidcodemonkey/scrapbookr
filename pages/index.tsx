import type { NextPage } from 'next';
import { ImageUploader } from '../components/image/ImageUploader';
import { Header } from '../components/layout/header';

const Home: NextPage = () => {
  return (
    <>
      <div className='h-screen flex flex-col'>
        <Header />
        <div className='max-w-5xl mx-auto h-full flex flex-col'>
          <div className="my-auto">
            <ImageUploader uploadUrl='/api/bookr' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

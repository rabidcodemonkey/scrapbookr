import type { NextPage } from 'next';
import { ImageUploader } from '../components/image/ImageUploader';

const Home: NextPage = () => {
  return (
    <>
      <div className='h-screen'>
        <h1 className='text-3xl font-bold underline'>Tailwind CSS!</h1>
        <div className='container mx-auto h-full'>
          <ImageUploader uploadUrl='/api/bookr' />
        </div>
      </div>
    </>
  );
};

export default Home;

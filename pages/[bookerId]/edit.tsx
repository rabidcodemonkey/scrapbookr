import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { ImageGrid } from '../../components/grid/ImageGrid';

process.env.API_URL = 'http://localhost:3000';

export type ImageInfo = {
  name: string;
  url: string;
};

type Props = {
  images: ImageInfo[];
};

const BookrEditView = (props: Props) => {
  console.log(props);

  const router = useRouter();
  const { bookerId } = router.query;

  useEffect(() => {
    console.log('isReady', router.isReady);
    if (router.isReady) {
      console.log('Edit bookerId', bookerId);
    }
  }, [router.isReady, bookerId]);

  return (
    <div>
      <h1>BookrEditView {bookerId}</h1>
      <ImageGrid images={props.images}></ImageGrid>
    </div>
  );
};

BookrEditView.getInitialProps = async (ctx: any) => {
  //- Origin of the request (only available on server-side)
  const res = await fetch(`${process.env.API_URL}/api/image/${ctx.query.bookerId}`);
  const images = await res.json();
  return { images };
};

export default BookrEditView;

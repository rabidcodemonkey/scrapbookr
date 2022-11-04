import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  bookrId: string;
};

const BookrGuestView = (props: Props) => {
  const router = useRouter();
  const { bookerId } = router.query;
  console.log('Guest bookerId', bookerId);

  return <div>BookrGuestView {bookerId}</div>;
};

export default BookrGuestView;

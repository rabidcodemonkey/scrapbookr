import nextConnect, { NextHandler } from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export type IBookr = {
  id: string;
  title: string;
  url: string;
};

//- Possibly another way: https://stackoverflow.com/questions/73729967/override-request-type-in-next-connect-middleware
type RequestWithBookr = NextApiRequest & {
  bookr: IBookr;
};

let filename = uuidv4() + '-' + new Date().getTime();
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/bookr', // destination folder
    filename: (req, file, cb) =>
      cb(null, getFileName(req as unknown as RequestWithBookr, file)),
  }),
});

const getFileName = (req: RequestWithBookr, file: Express.Multer.File) => {
  return path.join(req.bookr.id, `${filename}-${file.originalname}`);
};

const createNewBookr = (
  req: RequestWithBookr,
  res: NextApiResponse,
  next: NextHandler
) => {
  console.log(`${req.method} ${req.url} createNewBookr`);
  if (req.method === 'POST') {
    const id = uuidv4();
    const newBookr = {
      id,
      title: '',
      url: `/${id}/edit`,
    };
    req.bookr = newBookr;

    //- create a new folder on file system using the id as the folder name
    fs.mkdirSync(`./public/bookr/${newBookr.id}`, { recursive: true });
    fs.copyFileSync(
      `./public/bookr/default.json`,
      `./public/bookr/${newBookr.id}/default.json`
    );
  }

  next();
};

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  attachParams: true,
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute
  .use(createNewBookr)

  .post('/api/bookr', upload.array('images'), (req: NextApiRequest, res) => {
    const redirectUrl = (req as unknown as RequestWithBookr).bookr.url;
    console.log('Redirecting to', redirectUrl);

    res.redirect(redirectUrl);
  });

export default apiRoute;

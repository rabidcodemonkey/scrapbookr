// Reference: https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it

// Path: pages\api\image.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect, { NextHandler } from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { IBookr } from '../bookr';

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
  console.log('createNewBookr');
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

  //- Get /api/image/<bucket-id> - Get all images for a bucket.
  .get('/api/image/:bucketId', (req: { params: { bucketId: string } }, res) => {
    // Iterate through the files in the directory
    const bucketId = req.params.bucketId;
    const dir = `./public/bookr/${bucketId}`;
    const files = fs.readdirSync(dir);

    //- Filter out non image files and return the list of images
    const images = files
      .filter((file) => {
        const ext = path.extname(file);
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
      })
      .map((file) => {
        return {
          name: file,
          url: `/bookr/${bucketId}/${file}`,
        };
      });

    res.json(images);
  })

  // - get /image/<bucket-id>/<image-name>
  .get('/api/image/:bucketId/:imageName', (req: { params: unknown }, res) => {
    console.log('get bucketId imageName', req.params);
    res.status(200).json(req.params);
  })

  // - delete /image/<bucket-id>/<image-name>
  .delete(
    '/api/image/:bucketId/:imageName',
    (req: { params: unknown }, res) => {
      res.status(200).json(req.params);
    }
  )

  // - post /image/<bucket-id> // Upload one or more images to an existing bookr as multipart
  .post('/api/image/:bucketId', upload.array('file'))

  //- Create a new bookr with the provided images
  .post('/api/image', upload.array('file'), (req: NextApiRequest, res) => {
    const redirectUrl = (req as unknown as RequestWithBookr).bookr.url;
    console.log('Redirecting to', redirectUrl);

    res.redirect(redirectUrl);
  });

export default apiRoute;

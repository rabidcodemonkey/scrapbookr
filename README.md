Use Case:

First time visit to landing page

- Upload Files
  - Create bucket
  - Readirect to new bucket

Owner

- Provides read/write access
- Path: /<bucket-id>/edit

- get /bookr/<bucket-id> // Read
- post /bookr // Creates a new bookr id and uploads associated images, New user upload creates a new bookr
- put /bookr/<bucket-id> // Save
- delete /bookr/<bucket-id> // Deletes all images associated with the project

- get /image/<bucket-id>/<image-name>
- post /image/<bucket-id> // Upload one or more images as multipart
- put /image/<bucket-id>/<image-name>
- delete /image/<bucket-id>/<image-name>

Visitor

- Path: /<bucket-id>
- Provides read access

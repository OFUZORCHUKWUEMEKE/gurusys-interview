import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';

export async function uploadImage(
    file:any
): Promise<UploadApiResponse | UploadApiErrorResponse> {

    return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result:any) => {
            if (error) return reject(error);
            resolve(result);
        });

        toStream(file.buffer).pipe(upload);
    });
}
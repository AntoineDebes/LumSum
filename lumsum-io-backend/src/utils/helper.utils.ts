import { createWriteStream, unlinkSync, statSync } from 'fs';
import { join } from 'path';

export const createUniqueFileName = (filename: string): string => {
    const ext: string | undefined = filename.split(".").pop();
    if (!ext) throw new Error("Bad filename!");
    const newFilename: string = `${new Date().getTime()}.${ext}`;
    return newFilename;
}

export const storeFS = ({ stream, filename }: any) => {
    const newFileName = createUniqueFileName(filename);
    const path = join(__dirname, '..', '..', `/public/uploads/${newFileName}`);
    return new Promise((resolve, reject) =>
        stream
            .on('error', (error: any) => {
                if (stream.truncated)
                    // delete the truncated file
                    unlinkSync(path);
                reject(error);
            })
            .pipe(createWriteStream(path))
            .on('error', (error: any) => {
                console.log(error);
                reject(error)
            })
            .on('finish', () => resolve({ filename: newFileName }))
    );
}

export const removeFS = (filename: string) => {
    const path = join(__dirname, '..', '..', `/public/uploads/${filename}`);
    return new Promise((resolve) => {
        try {
            console.log(statSync(path));
            if (statSync(path)) {
                console.log("going to delete");
                unlinkSync(path);
            }
            resolve(true);
        } catch (error) {
            resolve(true);
        }
    });
}
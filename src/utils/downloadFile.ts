import https from 'https';
import fs from 'fs';
import path from 'path';

const supportedProtocol = ['http:', 'https:'];

export const downloadFile = (targetFileUrl: URL, distributeFilePath: string) => {
  return new Promise<void>((resolve, reject) => {
    const protocol = targetFileUrl.protocol;
    if (!supportedProtocol.includes(protocol)) {
      reject(new Error(`${protocol} is not supported on downloadFile util`));
    }
    if (path.extname(targetFileUrl.pathname) !== path.extname(distributeFilePath)) {
      reject(new Error(`Path extension is incorrect: ${targetFileUrl.pathname} and ${distributeFilePath}`));
    }

    const file = fs.createWriteStream(path.resolve(process.cwd(), distributeFilePath));
    https
      .get(targetFileUrl.toString(), res => {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', e => {
        fs.stat(distributeFilePath, (err, stats) => {
          fs.rm(distributeFilePath, err => {
            reject(e);
          });
        });
      });
  });
};

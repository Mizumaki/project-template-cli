import https from 'https';
import fs from 'fs';
import path from 'path';

const supportedProtocol = ['http:', 'https:'];

/**
 * Download the file from given `targetFileUrl` into `distributeFilePath`
 * Returns the downloaded file path
 */
export const downloadFile = async ({
  targetFileUrl,
  distributeFilePath,
}: {
  targetFileUrl: URL;
  /**
   * File Path where the downloaded file will put
   */
  distributeFilePath: string;
}) => {
  return new Promise<string>((resolve, reject) => {
    const protocol = targetFileUrl.protocol;
    if (!supportedProtocol.includes(protocol)) {
      reject(new Error(`${protocol} is not supported on downloadFile util`));
      return;
    }

    const distPath =
      path.extname(distributeFilePath) !== ''
        ? distributeFilePath
        : path.join(distributeFilePath, path.basename(targetFileUrl.pathname));

    if (path.extname(distPath) !== path.extname(targetFileUrl.pathname)) {
      reject(new Error(`Path extension is incorrect: ${targetFileUrl.pathname} and ${distributeFilePath}`));
      return;
    }

    fs.mkdir(path.dirname(distPath), { recursive: true }, e => {
      if (e) {
        reject(e);
        return;
      }

      const file = fs.createWriteStream(path.resolve(process.cwd(), distPath));
      https
        .get(targetFileUrl.toString(), res => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(distPath);
          });
        })
        .on('error', e => {
          console.error(e);
          console.log('Start deleting the failed downloaded file');
          fs.stat(distPath, (err, stats) => {
            if (err) {
              reject(err);
              return;
            }
            fs.rm(distPath, err => {
              if (err) {
                reject(err);
                return;
              }
              console.log('Deleting file completed');
              reject(e);
            });
          });
        });
    });
  });
};

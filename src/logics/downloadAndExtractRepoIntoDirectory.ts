import AdmZip from 'adm-zip';
import fs from 'fs/promises';
import path from 'path';
import { downloadFile } from '~/utils/downloadFile';

const TMP_FOLDER_NAME = '.project-template-cli_tmp';

export const downloadAndExtractRepoIntoDirectory = async ({
  downloadRepoUrl,
  destDirPath,
}: {
  downloadRepoUrl: URL;
  destDirPath: string;
}): Promise<void> => {
  const tmpFolderPath = path.join(destDirPath, TMP_FOLDER_NAME);
  try {
    const zipFilePath = path.join(tmpFolderPath, 'repo.zip');
    await downloadFile({ targetFileUrl: downloadRepoUrl, distributeFilePath: zipFilePath });
    const zip = new AdmZip(zipFilePath);
    const entries = zip.getEntries();
    const rootFile = entries[0];
    if (rootFile === undefined) {
      throw new Error("Couldn't find the first entry in zip file");
    }
    if (!rootFile.isDirectory) {
      // If it is Github Repository Zip file, the first entry file should be the directory with repo name.
      throw new Error(`The first entry in zip file is not a directory: ${rootFile.entryName}`);
    }
    zip.extractAllTo(tmpFolderPath);
    await fs.mkdir(destDirPath, { recursive: true });
    await fs.cp(path.join(tmpFolderPath, rootFile.entryName), destDirPath, { recursive: true });
  } finally {
    await fs.rm(tmpFolderPath, { recursive: true, force: true });
  }
};

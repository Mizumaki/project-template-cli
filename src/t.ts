import { downloadFile } from './utils/downloadFile';

const url = new URL('https://github.com/Mizumaki-misc/template_next-ts/archive/refs/heads/master.zip');
downloadFile({ targetFileUrl: url, distributeFilePath: '../test' }).catch(e => {
  console.error(e);
});

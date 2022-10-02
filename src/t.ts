import { downloadFile } from './utils/downloadFile';

const url = new URL('https://github.com/Mizumaki-misc/template_next-ts/archive/refs/heads/master.zip');
downloadFile(url, './dist/master.zip').catch(e => {
  // console.error(e);
});

# Project Template CLI

The CLI to start project easily.

Like `create-react-app`, this CLI makes it easy to start the project based on my project template.
The list of my templates can be found in `./src/mock.ts`.

## How To Install

First, run `npm run build`.
Then, run `npm run pkg`.

For this, the binary file named "project-template-cli.bin" will be created in your project root directory.
If this binary doesn't work well, see target option of "pkg".
https://github.com/vercel/pkg#targets

And setup the shortcut to run binary as you want.

## How To Develop

First, run `npm run start`.
Then, run `node dist/cli.js` in new terminal.

### Before you develop

**All new member have to run `npx husky install` before start development.**

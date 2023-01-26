# Secret Messenger Frontend
The secret messenger frontend is a browser extension frontend for the Secret Messenger

## Future Work
- Finish the frontend UI
- Make messages only viewable to sender and recipient
- Prevent full re-render when message is sent
- Publish to the Chrome Web Store

## Usage
1. First, open the frontend directory and run `yarn install`
2. Run `yarn build`. Note: This currently only works on Linux. For usage on Mac, adjust the build script in `package.json` to match https://github.com/thomaswang/next-chrome/blob/main/next-app/package.json
3. Open up your extensions in Chrome and enable dev mode if it's not already enabled.
4. Choose `load unpacked` and select the `extension` directory.

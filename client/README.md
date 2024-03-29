# Front End application

Front End app to submit product reviews, view the latest comments and see the product's stats.

Made using:
- TypeScript
- React
- React Hooks
- React Context
- Chart.js
- React Testing Library
- CSS modules
- Axios
- ESLint
- Prettier
- Husky

## Notes on tech decisions

### Main tools

The application's functionality is very straightforward, so I've decided not to use any additional tools like Redux, CSS preprocessors or CSS-in-JS libraries.\
Instead, I used built-in features such as React Context and CSS modules.\
This helped me to keep the code base more light, readable and not overcomplicated.

### Graph library
Chart.js React library was chosen as it's the lightest of all well-crafted Chart libraries ([BundlePhobia info](https://bundlephobia.com/package/react-chartjs-2@4.3.0)). The package's bundle size was a priority as the application didn't require a complex graph.

### Testing
Git hooks are added to run prettier and eslint before each commit and run tests before each push.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn interactive-test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test`

Launches the test runner in the non-interactive mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn sourcemap-build`

Builds the app for production to the `build` folder with source maps.\
This build files can be used for the source map analysis.

### `yarn analyze`

Analyzes the bundle using source maps.\
Run `yarn sourcemap-build` before using this command to build the app with source maps.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
# Dayplanner

[![Coverage](https://sonar.der-hahn.net/api/project_badges/measure?project=Kevin.Hahn_dayplanner_64748fee-d48a-4e45-8539-4b15fee1cf90&metric=coverage&token=sqb_3e5566b528819b8ffa561388dcc1d055b150ab13)](https://sonar.der-hahn.net/dashboard?id=Kevin.Hahn_dayplanner_64748fee-d48a-4e45-8539-4b15fee1cf90)

[![Quality Gate Status](https://sonar.der-hahn.net/api/project_badges/measure?project=Kevin.Hahn_dayplanner_64748fee-d48a-4e45-8539-4b15fee1cf90&metric=alert_status&token=sqb_3e5566b528819b8ffa561388dcc1d055b150ab13)](https://sonar.der-hahn.net/dashboard?id=Kevin.Hahn_dayplanner_64748fee-d48a-4e45-8539-4b15fee1cf90)

A day planner application built using React, designed for use as a training tool. The user-friendly interface allows for easy scheduling and management of daily tasks.

## Available Scripts

This project uses [yarn](https://yarnpkg.com/) as package manager.
In the project directory, you can run:

| script | description |
| ----- | ----- |
|`yarn start` | Runs the app in the development mode. Open [http://localhost:8080](http://localhost:8080) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.|
|`yarn start:exposed` | Runs the app in the exposed development mode. Use this mode to test in network.|
|`yarn test` | Launches the vitest test runner.|
|`yarn test:ui` | Launches the vitest test runner with an ui. (<http://localhost:51204/__vitest__/#/>)|
|`yarn cypress:open` | Launches the cypress test runner with an ui for E2E tests.|
|`yarn run build` | Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!|
|`yarn lint` | Lints the code for potential errors and enforces code quality standards, ensuring that the code is clean, readable, and maintainable.|

### Development local

To run the application locally you need to follow these steps:

```bash
# install dependencies
yarn install

# copy the.env.local.sample to.env.local
cp .env.local.sample .env.local

# run the application
yarn start
```

### Release scripts

Release scripts are used for versioning the application and generating the [CHANGELOG.MD](CHANGELOG.md)

| script | description |
| --- | --- |
| `release:major` | Releases a new major release. e.g. 2.0.0 -> `3`.0.0 |
| `release:minor` | Releases a new minor release. e.g. 2.0.0 -> 2.`1`.0 |
| `release:patch` | Releases a new patch release. e.g. 2.0.0 -> 2.0.`1` |
| `release:candidate:major` | Releases a new major release candidate. e.g. 2.0.0 -> `rc.3`.0.0 |
| `release:candidate:minor` | Releases a new minor release candidate. e.g. 2.0.0 -> `rc.`2.`1`.0 |
| `release:candidate:patch` | Releases a new patch release candidate. e.g. 2.0.0 -> `rc.`2.0.`1` |

### Manual build a new package

For building a new package manually you need to follow these steps:

1. Setup a Rust environment on Linux or Windows (tested with Ubuntu and Windows 10) for tauri ([more instructions](https://tauri.app/v1/guides/getting-started/prerequisites))
   - hint: this environment determines what will be build (.deb or .msi) 
2. Fixate the version by running one of the release scripts
   - e.g. if you want to release a new patch run `yarn run release:patch`
3. Take the new version number from the `package.json` and paste into `src-tauri/Cargo.toml` (version) and `tauri.conf.json` (package: {version}) and save everything
4. Now run `yarn run app:build` on your system to generate the package file (output in `src-tauri/target/release/bundle/`)
5. Finally copy this package file to `./release/linux|windows` and commit with a message like: `build: deb package v.0.4.0`
6. Repeat 4 and 5 on the other environment

### Release a new version in gitlab

1. Head over to [gitlab Releases](https://gitlab.com/Kevin.Hahn/dayplanner-/releases)
2. Create a new release
3. Choose the new version from the tag dropdown and write the same into the 'Release title'
4. Copy the last generated text from the CHANGELOG.md into the field 'Release notes' (compare structure with other releases, e.g. caption)
5. Add both urls to the 'Release assets':
   |URL | Link title | Type |
   | --- | --- | --- |
   | <https://gitlab.com/Kevin.Hahn/dayplanner-/blob/develop/release/linux> | Dayplanner.deb | Package |
   | <https://gitlab.com/Kevin.Hahn/dayplanner-/blob/develop/release/windows> | Dayplanner.msi | Package |
6. Finally create the release :)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

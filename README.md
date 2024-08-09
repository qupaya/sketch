# ngSketch

ngSketch is an open-source headless library for Angular 18+. It peppers your application with UI functionality but keeps it free of styled dependencies. ngSketch only uses Angular CDK as a dependency, which is also completely unstyled.

Get inspired by opinionated demos and use the theme that fits your application.

## Use ngSketch

In order for all features to work, you need to add the `SketchModule` to the `appConfig` of you application.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    importProvidersFrom(SketchModule),
  ],
};
```

## Storybook

Deployed from main: https://661d194a3f6d14d86c328554-yfvvdffiwi.chromatic.com/

Chromatic app: https://www.chromatic.com/builds?appId=661d194a3f6d14d86c328554

## Start the application

Run `npx nx serve sketch` to start the development server. Happy coding!

## Build for production

Run `npx nx build sketch` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## License

ngSketch is licensed under **MIT**. For more information, please see [LICENSE](/LICENSE)

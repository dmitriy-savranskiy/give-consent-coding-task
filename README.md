# Running the App
To run the app just run the following commands:
```
yarn
yarn start
```

# Testing
To run tests, execute
```
yarn test
```

Use `renderWithStore` function from `testUtils` when you write integration tests.  
Use `testIds.ts` file for storing `data-testid`'s, make sure to use prefix `tid` for each test id function.

# HTTP Mocking
We use `mswjs` library for mocks. It's enabled by default and currently we don't have the ability to disable it, but it'll be implemented soon. You can find mocks in `api/mocks`. See the files with `Mock` postfix. 
# Project structure
```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├──api 
    ├──app 
    ├──common 
    ├──features
    │   ├──featureA
    │   │    ├──ComponentName
    │   │    │      ├──ComponentName.tsx
    │   │    │      ├──ComponentName.test.tsx
    │   │    │      └──ComponentName.module.scss
    │   │    └──featureASlice.ts
    │   └──featureB
    ├──models 
    ├──index.tsx 
    ├──react-app-env.d.ts
    ├──serviceWorker.ts
    └──setupTests.ts
```

Project follows a "feature folder" approach (all files for a feature in the same folder). Within a given feature folder, the Redux logic for that feature should be written as a single "slice" file

For each component should be created a folder where all the related to the component files are stored (component, tests, styles, helpers, etc.)

## Folders description
`api` - Everything related to the communication over HTTP.  
`app` - Low level logic that is rarely changed (rootComponent, rootStore, providers, etc).  
`common` - Any shared code.  
`features` - Main business logic of the app. Project follows a "feature folder" approach (all files for a feature in the same folder). Within a given feature folder, the Redux logic for that feature should be written as a single "slice" file.  
`models` - Types for describing data (domain entities, DTO's, etc).
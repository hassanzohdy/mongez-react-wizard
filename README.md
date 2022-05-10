# Mongez React Wizard

A Wizard tool to generate and handle react apps.


## Installation

`yarn add @mongez/react-wizard`

OR

`npm i @mongez/react-wizard`

## Usage

The package works through command line for the time being, Here are the available commands.

### Generate New Module Command

`npx engez module contact-us --app front-office`

This command will create a new module in `src/apps/front-office`.

> The `--app` option must be sent otherwise an error will raise.

The structure of the created module will be as follows:

```
|--- src
  |--- apps
     |-- front-office
        |-- contact-us
            |-- components
                |-- ContactUsPage
                    |-- index.ts
                    |-- ContactUsPage.tsx
                    |-- index.module.scss
                    |-- styled.tsx
                    |-- types.ts
            |-- services
                |-- service.ts
            |-- utils
                |-- data.ts
            |-- hooks
                |-- index.ts
            |-- locales.ts
            |-- routes.ts
            |-- provider.ts
```

The `locales.ts` and `routes.ts` files are imported to `provider.ts`

Utils and hooks directories their names express themselves, hooks for react hooks, utils for flags / data / functions / helpers...etc.

The `services` directory is for ajax requests, by default it creates a Restful Service Class.

`routes.ts` is generated and assuming there is `apps/{appName}/helpers/urls` which exports an object that contains all application routes.

Also, `publicRoutes` function which is imported from `apps/{appName}/helpers/router`.

For component structure, check the following section.

## Generate New Component Command

similarly to generating new module, except this command will generate only component structure.

`npx engez component ContactUsForm --module contact-us --app=front-office`

This will generate a new component directory inside `src/apps/front-office/contact-us/components` called `ContactUsForm`.

> Please note all generated components names are transformed into StudlyCase automatically.

Each Component Structure Looks Like:

```
|-- ComponentName
    |-- index.ts
    |-- ComponentName.tsx
    |-- index.module.scss
    |-- styled.tsx
    |-- types.ts
```

Let's see in depth the previous structure.

- `index.ts`: is just for exposing the component to be used outside, this file exports the component and its types.
- `index.module.scss`: the scss module file to ensure component encapsulation.
- `styled.tsx`: If you're using styled components, put it here.
- `types.ts`: Component props and any other related types to the component, by default it has the `ComponentProps` type and is exported to be used in the component file.
- `ComponentName.tsx`: is the actual component file where you put your jsx code inside it, that file automatically imports the sass module file and types file.

The final generated module and component will be like:

```
|--- src
  |--- apps
     |-- front-office
        |-- contact-us
            |-- components
                |-- ContactUsPage
                    |-- index.ts
                    |-- ContactUsPage.tsx
                    |-- index.module.scss
                    |-- styled.tsx
                    |-- types.ts
                |-- ContactUsForm
                    |-- index.ts
                    |-- ContractUsForm.tsx
                    |-- index.module.scss
                    |-- styled.tsx
                    |-- types.ts
            |-- services
                |-- service.ts
            |-- utils
                |-- data.ts
            |-- hooks
                |-- index.ts
            |-- locales.ts
            |-- routes.ts
            |-- provider.ts
```


## Change Log

- V1.1.10 (10 May 2022)
    - Beta Version

## TODO

- Create `mongez-wizard.js` file for advanced configurations.
- Allow more customization on the generated files.
- Expose stub generator so developers can make their own generated files.
- Introduce `@mongez/react-atom` to the generated module.
- Allow generating components inside components.
- Add tests to the module.
- Add tests and storybook to the component.
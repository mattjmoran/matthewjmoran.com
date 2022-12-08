# matthewjmoran.com

This is the source code for my personal website, [matthewjmoran.com](https://matthewjmoran.com). The site is built using [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/).

_Currently, the website is not deployed anywhere, but I plan to deploy it to [Azure](https://azure.microsoft.com/en-us/) in the future._

## Table of Contents

- [matthewjmoran.com](#matthewjmorancom)
  - [Table of Contents](#table-of-contents)
  - [Why?](#why)
  - [Getting Started](#getting-started)
  - [Stack](#stack)
    - [Package Management](#package-management)
    - [Framework](#framework)
    - [Styling](#styling)
    - [Testing](#testing)
  - [VSCode Extensions](#vscode-extensions)
  - [Resources](#resources)

## Why?

I wanted to build my website to showcase my portfolio and build out my personal brand. I also wanted to learn more about [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/), so I decided to build the site using those technologies.

**But _why_ open-source?** I am an organization, documentation and process fanatic. I love to document everything I do, and I love to share my knowledge with others. This project is made possible from the help of other [people's open-sourced work](#resources). By sharing both their work and my own, I hope to help others learn and grow.

I've broken down the project into various [sections](#table-of-contents) below. I've also included a [resources](#resources) section that lists the resources I used to build the site.

My stretch goal is to eventually utilize my experiences from this project to create my own original resources that I can share with others.

## Getting Started

First, install the dependencies:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

### Package Management

- [Yarn](https://yarnpkg.com/en/)

### Framework

- [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)[^1]
  - [React](https://reactjs.org/)[^1]
  - [React-DOM](https://reactjs.org/docs/react-dom.html)[^1]
- [Gray-Matter](https://github.com/jonschlinkert/gray-matter)
- [Marked](https://marked.js.org/)

### Styling

- [ESLint](https://eslint.org/)[^1][^2]
- [Prettier](https://prettier.io/)[^3]
- [Husky](https://typicode.github.io/husky/)
- [Lint-Staged](https://github.com/okonet/lint-staged/)
- [Commitlint](https://commitlint.js.org/#/)
- [Gitmoji](https://gitmoji.carloscuesta.me/)

### Testing

- [serve](https://github.com/vercel/serve)

## VSCode Extensions

_N.B. These are not required, but they are recommended as they are utilized in [.vscode/settings.json](.vscode/settings.json)._

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

## Resources

- Paulin Trognon's article on [Starting a clean Next.js project with TypeScript, ESLint and Prettier](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js)
- Mark's article on [How to lint Git commit messages with commitlint](https://remarkablemark.org/blog/2019/05/29/git-husky-commitlint/)
- Ben Awad's video on [Next.js Static Site Generation](https://www.youtube.com/watch?v=pY0vWYLDDco)

[^1]: Installed by default with Next.js with `yarn create next-app --typescript`
[^2]: Refer to [this](.eslintrc.json) file for ESLint extensions, plugins, and configuration details.
[^3]: Refer to [this](.prettierrc.json) file for Prettier configuration details.

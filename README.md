# matthewjmoran.com

A personal website, [matthewjmoran.com](https://matthewjmoran.com/), built using SvelteKit with Static Site Generation (SSG).

## Getting Started

With Docker, this project creates a consistent local development environment that runs the same everywhere, eliminating the __“But it runs on my machine”__ problem.

### Development

Start the Docker development server container with hot reloading. Read more on `docker compose watch` for local development on [Docker's blog](https://www.docker.com/blog/announcing-docker-compose-watch-ga-release/).

```bash
docker compose watch
```

Close the Docker development server container.

```bash
docker compose down
```

### Preview

```bash
docker build --target preview -t mjm-preview .
docker run -it --rm --name mjm-preview -p 4173:4173 mjm-preview
```

### Deploy

Deployment is done via Github Actions. See [deploy.yaml](.github/workflows/deploy.yaml) for more details.

Commits to the `trunk` branch are deployed to the [preview environment](https://preview.matthewjmoran.pages.dev/).

Commits to the `trunk` branch with a `vMAJOR.MINOR.PATCH` [release tag](https://trunkbaseddevelopment.com/branch-for-release/#tag-instead-of-branch) are deployed to the [production environment](https://matthewjmoran.com/).

## Releases

All releases are assigned a version number that follow the rules and requirements outlined in the [Semantic Versioning](https://semver.org/) system.

The release procedure is as follows:

1. `git checkout trunk`
2. `git pull --rebase origin trunk`
3. Increment the version field in [`web/package.json`](web/package.json)
4. `git commit -am "Release vMAJOR.MINOR.PATCH"`
5. `git tag -a vMAJOR.MINOR.PATCH -m "Release vMAJOR.MINOR.PATCH"`
6. `git push origin trunk --tags`

## License

### Code

The code in this repository is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). You can freely use, modify, and distribute the code under the terms of this license. See the [`LICENSE_CODE`](LICENSE_CODE) file for full details.  

### Content

All non-code content, including artwork, images, writing, media files, and other creative materials, is © Matthew J. Moran, 2025. It is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en). See the [`LICENSE_CONTENT`](LICENSE_CONTENT) file for full details.

#### Key Terms for Content

- __Attribution__ — You must give [appropriate credit](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-appropriate-credit), provide a link to the license, and [indicate if changes were made](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-indicate-changes). You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.  
- __NonCommercial__ — You may not use the material for [commercial purposes](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-commercial-purposes).  
- __NoDerivatives__ — If you [remix, transform, or build upon](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-some-kinds-of-mods) the material, you may not distribute the modified material.

For uses beyond these terms, please contact [matt@matthewjmoran.com](mailto:matt@matthewjmoran.com).  

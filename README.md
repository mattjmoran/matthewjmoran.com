# matthewjmoran.com

A personal website, [matthewjmoran.com](https://matthewjmoran.com/), built using SvelteKit with Static Site Generation (SSG).

## Getting Started

This project uses Docker to create a consistent local development environment that runs identically everywhere—eliminating the notorious **“But it runs on my machine”** problem.

### Development

Start the Docker development server container with hot reloading. For more details, read about [`docker compose watch`](https://www.docker.com/blog/announcing-docker-compose-watch-ga-release/) on Docker’s blog.

```bash
docker compose watch
```

When you’re done, stop the Docker development server container:

```bash
docker compose down
```

### Preview

Build and run the preview version of the site with the following commands:

```bash
docker build --target preview -t mjm-preview .
docker run -it --rm --name mjm-preview -p 4173:4173 mjm-preview
```

## Releases

Releases are automated with the [Release Please GitHub Action](https://github.com/google-github-actions/release-please-action). This tool automates CHANGELOG generation, GitHub release creation, and [Semantic Versioning](https://semver.org/) bumps.

It works by parsing the project's Git history for [Conventional Commit](https://www.conventionalcommits.org/) messages and automatically generating release pull requests (PRs).

These release PRs are continuously updated as new changes are pushed to the `trunk` branch until the PR is merged for release.

Every push to `trunk` deploys the build to the preview Cloudflare Pages environment, and when a release PR is merged, the site is deployed to the production Cloudflare Pages environment.

This entire process is automated with Github Actions. See [deploy.yaml](.github/workflows/deploy.yaml) for more details.

## Documentation

The following documents provide additional details about various aspects of the project:

- [docs/credits](docs/credits.md) - Acknowledgements and credits for contributions and resources that have supported the project.
- [docs/dependencies](docs/dependencies.md) - A detailed list of project dependencies, including tools, libraries, and frameworks used throughout the website.
- [docs/mindmap](docs/mindmap.md) - A mindmap to help brainstorm creative ideas for this project.
- [docs/resources](docs/resources.md) - A collection of external resources, software, tools, guides, articles, tutorials, videos, and more relevant to the project's development and maintenance.

## License

### Code

The code in this repository is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). You can freely use, modify, and distribute the code under the terms of this license. See the [`LICENSE_CODE`](LICENSE_CODE) file for full details.

### Content

All non-code content, including artwork, images, writing, media files, and other creative materials, is © Matthew J. Moran, 2025. It is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en). See the [`LICENSE_CONTENT`](LICENSE_CONTENT) file for full details.

#### Key Terms for Content

- **Attribution** — You must give [appropriate credit](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-appropriate-credit), provide a link to the license, and [indicate if changes were made](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-indicate-changes). You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for [commercial purposes](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-commercial-purposes).
- **NoDerivatives** — If you [remix, transform, or build upon](https://creativecommons.org/licenses/by-nc-nd/4.0/#ref-some-kinds-of-mods) the material, you may not distribute the modified material.

For uses beyond these terms, please contact [matt@matthewjmoran.com](mailto:matt@matthewjmoran.com).

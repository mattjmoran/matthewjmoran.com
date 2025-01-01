# matthewjmoran.com

A personal website, [matthewjmoran.com](https://matthewjmoran.com/), built using SvelteKit with Static Site Generation (SSG).

## Usage

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

Commits to the `trunk` branch that modify `web/` or `.github/workflows` are deployed to the [preview environment](https://preview.matthewjmoran.pages.dev/).

Commits to a `release/vMAJOR.MINOR.PATCH` branch that modify `web/` or `.github/workflows` are deployed to the [production environment](https://matthewjmoran.com/).

## Releases

All [release branches](https://trunkbaseddevelopment.com/branch-for-release/) are assigned a version number that follow the rules and requirements outlined in the [Semantic Versioning](https://semver.org/) system.

The release procedure is as follows:

1. `git checkout trunk`
2. `git pull -r origin trunk`
3. `git checkout -b release/vMAJOR.MINOR.PATCH`
4. Increment the version field in [`web/package.json`](web/package.json)
5. `git commit -am "Release vMAJOR.MINOR.PATCH"`
6. `git push -u origin release/vMAJOR.MINOR.PATCH`
7. `git checkout trunk`
8. `git branch -d release/vMAJOR.MINOR.PATCH`

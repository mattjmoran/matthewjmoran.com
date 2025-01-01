# matthewjmoran.com

A personal website, [matthewjmoran.com](https://matthewjmoran.com), built using SvelteKit with Static Site Generation (SSG).

## Usage

With Docker, this project creates a consistent local development environment that runs the same everywhere, eliminating the __“But it runs on my machine”__ problem.

### Development

Start the Docker development server container with hot reloading. Read more on `docker compose watch` for local development on [docker's blog](https://www.docker.com/blog/announcing-docker-compose-watch-ga-release/).

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

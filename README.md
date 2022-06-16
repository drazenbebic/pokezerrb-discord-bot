
# Release Notes
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

#### 1.0.1

- Added the `random` command, which outputs a random pokemon. Usage. `@PokéZerrb Random`.
- Refactored the codebase.

#### 1.0.0

- Initial release

# Docker commands

Make sure to replace the version number with the current version.

#### Building the image

`docker build . -t drazenbebic/pokezerrb:1.0.0`

#### Saving the image

`docker save drazenbebic/pokezerrb:1.0.0 > drazenbebic_pokezerrb_1.0.0.tar`

#### Pushing the image to Docker Hub

`docker push drazenbebic/pokezerrb:1.0.0`

#### Pull the image from Docker Hub

Specific version: `docker pull drazenbebic/pokezerrb:1.0.0`

Latest version: `docker pull drazenbebic/pokezerrb:latest`

#### Run the image

Make sure to replace the `DISCORD_BOT_TOKEN` parameter with the actual discord token.

`docker run -d --name pokezerrb --restart=always -p 8000:8000 -e DISCORD_BOT_TOKEN="TOKEN" drazenbebic/pokezerrb:1.0.0`

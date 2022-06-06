## Docker commands

Make sure to replace the version number with the current version.

### Building the image

`docker build . -t drazenbebic/pokezerrb:1.0.0`

### Saving the image

`docker save drazenbebic/pokezerrb:1.0.0 > drazenbebic_pokezerrb_1.0.0.tar`

### Pushing the image to Docker Hub

`docker push drazenbebic/pokezerrb:1.0.0`

### Pull the image from Docker Hub

#### Specific version
`docker pull drazenbebic/pokezerrb:1.0.0`

#### Latest version
`docker pull drazenbebic/pokezerrb:latest`

### Run the image

Make sure to replace the `DISCORD_BOT_TOKEN` parameter with the actual discord token.

`docker run -d --restart=always -p 8000:8000 drazenbebic/pokezerrb:1.0.0 -e DISCORD_BOT_TOKEN="TOKEN" --name PokeZerrb`
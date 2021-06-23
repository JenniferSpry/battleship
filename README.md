# BattleShipJS

BattleShipJS is an old student project of mine. You can play battleship against a very simple AI. The chat does not work and the site includes documentation for the whole project.

## Deployment
Throw everything on a server and go :D (this does not even have a package.json, so lovely and simple).

## Docker
### Run locally
```
docker run --name battleship -p 8080:80 -v "$(pwd):/usr/share/nginx/html:ro" -d nginx
```
Reachable under http://localhost:8080/ (note the http)

### Traefik
The project is deployed on my server and run with [traefik](https://doc.traefik.io/traefik/).

Start with docker-compose:
```
docker-compose up -d
```
See: 
https://battleship.jensweek.de/

### Github Pages
Since there is absolutely no build magic involved here the project can be viewed with [github pages](https://pages.github.com/).

See:
https://jenniferspry.github.io/battleship/

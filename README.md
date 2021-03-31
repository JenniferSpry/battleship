# BattleShipJS

BattleShipJS is an old student project of mine. You can play battleship against a very simple AI. The chat does not work and the site includes documentation for the whole project.

## Deployment
Throw everything on a server and go :D (this does not even have a package.json, so lovely and simple).

## Docker
### Run locally
```
docker run --name battleship -p 8080:80 -v "$(pwd):/usr/share/nginx/html:ro" -d nginx
```
Reachable under http://localhost:8080/ (note the nttp)

### Traefik
```
dc up -d
```

https://battleship.jensweek.de/
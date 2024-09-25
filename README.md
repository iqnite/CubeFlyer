# Cheese & Lava!

Welcome!

This is a small Flappy-Bird-style game made for the CubeFlyer Game Challenge. Thanks to @MetzinAround for the original!

Check out the **Releases** page to see the changes.

## How to start the game

### Local

To launch the game on your local machine, open `game/index.html` in your browser.

### GitHub Codespaces

To launch the game in a codespace, you first need to install an HTTP Server:

```
npm i -g http-server
```

Once it's installed, start it:

```
http-server
```

Finally, open the following address in your browser:

```
http://127.0.0.1:8080/game
```

BabylonJS libraries are obtained through the BabylonJS CDN, so packages need to be installed. Textures are downloaded from the iqnite/CubeFlyer GitHub Page.

## How to play

### Instructions

Click or press <kbd>Space</kbd> to jump.

Don't bump into the green pipes.

The pipes get narrower as you approach them.

You earn 1 point for each pipe you pass.

### The high score system

The high score is automatically saved to the browser's local storage.

# Streamy-API-RTMP-Server

A small live video streaming server. Streamy, a live streaming app, needs this server to work properly: broadcasters send video to it, and viewers watch the stream back through it.

## What it does

- Accepts live video from broadcasting software such as OBS, ffmpeg or a phone app over RTMP (port 1935).
- Serves the live stream to viewers over HTTP (port 8000), for example as HTTP-FLV.
- Keeps a short cache of recent video so viewers who join late can start playing quickly.

The whole server is one short file, `index.js`, built on the [Node-Media-Server](https://github.com/illuspas/Node-Media-Server) library by illuspas.

## Tech stack

- Node.js
- node-media-server 2.x (RTMP, HTTP-FLV, WebSocket-FLV)

## Run it

You need Node.js installed. For live transcoding or recording features you would also need ffmpeg, but the default setup does not use it.

```bash
npm install
npm start
```

The server then listens on:

- RTMP: `rtmp://localhost:1935/live/<stream-name>`
- HTTP: `http://localhost:8000`

Try it with ffmpeg (publish a test video):

```bash
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://localhost:1935/live/test
```

Watch it with a player that supports FLV, for example `ffplay http://localhost:8000/live/test.flv` or VLC.

## Configuration

Optional environment variables (see `.env.example`):

| Variable | Meaning | Default |
| --- | --- | --- |
| `RTMP_PORT` | RTMP port | 1935 |
| `HTTP_PORT` | HTTP port | 8000 |
| `ALLOW_ORIGIN` | CORS origin for the HTTP server | `*` |
| `STREAM_AUTH_SECRET` | If set, publishing requires a signed URL | unset (open) |
| `STREAM_AUTH_PLAY` | Also require signed URLs for playback (`true`) | `false` |

Signed URL format is described in the [Node-Media-Server authentication docs](https://github.com/illuspas/Node-Media-Server#authentication). If you expose this server to the internet, set `STREAM_AUTH_SECRET` so strangers cannot publish to it.

## Status

Working. It is a minimal server meant to be run next to the Streamy app. There is no hosted demo because it needs a running server and a video source.

## Credits

All streaming functionality comes from [Node-Media-Server](https://github.com/illuspas/Node-Media-Server) (MIT licensed). This repository only configures and starts it.

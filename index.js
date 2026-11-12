const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: Number(process.env.RTMP_PORT) || 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: Number(process.env.HTTP_PORT) || 8000,
    allow_origin: process.env.ALLOW_ORIGIN || "*"
  }
};

// Optional: require signed URLs to publish (and play) streams.
// Leave STREAM_AUTH_SECRET unset to keep the open behaviour.
if (process.env.STREAM_AUTH_SECRET) {
  config.auth = {
    play: process.env.STREAM_AUTH_PLAY === "true",
    publish: true,
    secret: process.env.STREAM_AUTH_SECRET
  };
}

var nms = new NodeMediaServer(config);
nms.run();

// @trustvc/trustvc expects Node/browser globals that jsdom does not provide.
const { TextEncoder, TextDecoder } = require("util");
if (typeof global.TextEncoder === "undefined") global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === "undefined") global.TextDecoder = TextDecoder;
if (typeof global.setImmediate === "undefined") {
  const timers = require("timers");
  global.setImmediate = timers.setImmediate;
  global.clearImmediate = timers.clearImmediate;
}
const webStreams = require("stream/web");
for (const name of ["ReadableStream", "WritableStream", "TransformStream"]) {
  if (typeof global[name] === "undefined") global[name] = webStreams[name];
}

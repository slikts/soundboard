const { createReadStream } = require("fs");
const { extname } = require("path");

const lame = require("lame");
const wav = require("wav");
const portAudio = require("node-portaudio");

const play = ({ filePath, deviceId = -1 }, onError = console.error) => {
  const reader = getReader(filePath);
  const fileStream = createReadStream(filePath);

  reader.on("format", format => {
    const ao = new portAudio.AudioOutput({
      ...parseFormat(format),
      deviceId
    });
    ao.on("error", onError);
    reader.on("end", () => ao.end());
    reader.pipe(ao);
    ao.start();
  });

  fileStream.pipe(reader);
};

const getSampleFormat = bitDepth => {
  const sampleFormat = portAudio[`SampleFormat${bitDepth}Bit`];

  if (sampleFormat) {
    return sampleFormat;
  }

  throw Error(`Unknown bit depth: ${bitDepth}`);
};

const parseFormat = ({ channels: channelCount, sampleRate, bitDepth }) => ({
  channelCount,
  sampleRate,
  sampleFormat: getSampleFormat(bitDepth)
});

const getReader = filePath => {
  const ext = extname(filePath);

  switch (ext) {
    case ".mp3":
      return new lame.Decoder();
    case ".wav":
      return new wav.Reader();
  }

  throw Error(`Unknown file extension: ${ext}`);
};

module.exports = play;

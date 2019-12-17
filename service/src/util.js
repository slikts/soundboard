const { EOL } = require("os");

const dispatch = (
  { type, payload, meta, error },
  out = error ? process.stderr : process.stdout
) => {
  out.write(
    JSON.stringify({
      type,
      payload,
      meta,
      error
    }) + EOL
  );
};

const dispatchError = (error, origin) => {
  dispatch({
    type: "service/error",
    error: true,
    payload: { error, origin }
  });
};

Object.assign(module.exports, {
  dispatch,
  dispatchError
});

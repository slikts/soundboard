import keybinds, { bind, unbind, clear } from "./keybindSlice";

describe("keybinds reducer", () => {
  const key = "a";
  const path1 = "/path1";
  const path2 = "/path2";
  it("should handle binding", () => {
    expect(
      keybinds(
        {},
        {
          type: bind.type,
          payload: {
            key,
            path: path1
          }
        }
      )
    ).toEqual({ [key]: [path1] });

    expect(
      keybinds(
        {
          [key]: [path1]
        },
        {
          type: bind.type,
          payload: {
            key,
            path: path2
          }
        }
      )
    ).toEqual({ [key]: [path1, path2] });
  });

  it("should handle unbinding", () => {
    expect(
      keybinds(
        {
          [key]: [path1, path2]
        },
        {
          type: unbind.type,
          payload: {
            key,
            path: path1
          }
        }
      )
    ).toEqual({ [key]: [path2] });
  });

  it("should only unbind the last path", () => {
    expect(
      keybinds(
        {
          [key]: [path1, path1, path2]
        },
        {
          type: unbind.type,
          payload: {
            key,
            path: path1
          }
        }
      )
    ).toEqual({ [key]: [path1, path2] });
  });

  it("should handle clearing", () => {
    expect(
      keybinds(
        {
          [key]: [path1, path2]
        },
        {
          type: clear.type,
          payload: { key }
        }
      )
    ).toEqual({ [key]: [] });
  });
});

import playlist, { play, stop } from "./playlistSlice";

describe("playlist reducer", () => {
  const path1 = "/path1";
  const path2 = "/path2";
  it("should handle playing", () => {
    const init = playlist([], {
      type: play.type,
      payload: {
        filePath: path1
      }
    });

    expect(init).toEqual([
      {
        id: 0,
        filePath: path1
      }
    ]);

    expect(
      playlist(init, {
        type: play.type,
        payload: {
          filePath: path2
        }
      })
    ).toEqual([
      ...init,
      {
        id: 1,
        filePath: path2
      }
    ]);
  });

  it("should handle stopping", () => {
    expect(
      playlist(
        [
          {
            id: 0,
            filePath: path1
          },
          {
            id: 1,
            filePath: path2
          }
        ],
        {
          type: stop.type,
          payload: {
            id: 0
          }
        }
      )
    ).toEqual([
      {
        id: 1,
        filePath: path2
      }
    ]);
  });
});

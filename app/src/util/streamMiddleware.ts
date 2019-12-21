import { Middleware, Action, AnyAction } from "redux";
import { Readable } from "stream";

const streamMiddleware: StreamMiddleware = ({ dispatch }) => next => action => {
  if (action instanceof Readable) {
    action.on("data", chunk => void dispatch(chunk));
    action.on(
      "error",
      (error: Error & { type: string }) =>
        void dispatch({
          error: true,
          ...error
        })
    );

    return;
  }

  return next(action);
};

export interface StreamDispatch<A extends Action> {
  <T extends A>(action: T): T;
  <R>(action: StreamAction): R;
}

export type StreamAction = Readable;

export type StreamMiddleware<S = {}, A extends Action = AnyAction> = Middleware<
  StreamDispatch<A>,
  S,
  StreamDispatch<A>
>;

export default streamMiddleware;

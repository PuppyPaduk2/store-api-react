const { createContext, useState, useEffect, useContext: useContextReact, useMemo } = require("react");
const { getRootContextScope } = require("store-api");

const Context = createContext(getRootContextScope());

function useStoreState(store) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.on(setState);

    return () => {
      store.off(setState);
    };
  }, [store]);

  return state;
}

function useUnionState() {
  // TODO
}

const contextCallbacks = new Map();

function useContext(callback) {
  const scope = useContextReact(Context);

  return useMemo(() => {
    let contextCallback = contextCallbacks.get(callback);

    if (contextCallback && contextCallback.has(scope)) {
      return contextCallback.get(scope);
    } else {
      contextCallback = new Map();
      contextCallbacks.set(callback, contextCallback);
    }

    const scopeResult = scope(callback);

    contextCallback.set(scope, scopeResult);

    return scopeResult;
  }, [scope, callback]);
}

const serverContextRequests = new Map();

function useServerContext(key, callback) {
  const scope = useContextReact(Context);

  return useMemo(async () => {
    if (typeof window === "undefined") {
      const scopeResult = scope(callback);

      if (scopeResult instanceof Promise) {
        let requests = serverContextRequests.get(scope) || null;

        if (requests === null) {
          requests = new Map();
        }

        if (requests.has(key) === false) {
          requests.set(key, scopeResult);
        }

        await scopeResult;
      }
    }
  }, [scope]);
}

function allSettled(contextScope) {
  const requests = serverContextRequests.get(contextScope) || new Map();

  serverContextRequests.set(contextScope, new Map());

  return Promise.allSettled(Array.from(requests.values()));
}

module.exports = {
  Context: Context.Provider,
  useStoreState,
  useUnionState,
  useContext,
  useServerContext,
  allSettled,
};
const {
  createContext,
  useState,
  useEffect,
  useContext: useContextReact,
  useMemo,
} = require("react");
const { rootContext } = require("store-api");

const Context = createContext(rootContext);

function useContext(callback) {
  const contextScope = useContextReact(Context);

  return useMemo(() => contextScope(callback), [contextScope, callback]);
}

function useStore(storeInstance) {
  const [state, setState] = useState(storeInstance.getState());

  useMemo(() => {
    storeInstance.on(setState);
  }, [storeInstance]);

  useEffect(() => {
    return () => {
      storeInstance.off(setState);
    };
  }, [storeInstance]);

  return state;
}

module.exports = {
  Context: Context.Provider,
  useContext,
  useStore,
};

import { loadRemote } from "@module-federation/enhanced/runtime";

const betfinio_context = loadRemote('betfinio_context').then(module => {
  return module;
})


export default betfinio_context;
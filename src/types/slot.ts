import JObject from "./object";

// eslint-disable-next-line @typescript-eslint/ban-types
type Slot = (JObject | null) | (number | bigint) | boolean; // Frame and LocalVars

export default Slot;

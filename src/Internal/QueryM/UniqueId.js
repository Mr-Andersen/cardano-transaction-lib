import * as uniqid from "uniqid";

export const uniqueId = str => () => uniqid(str);

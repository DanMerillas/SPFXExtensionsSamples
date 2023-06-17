declare interface ISendItemCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'SendItemCommandSetStrings' {
  const strings: ISendItemCommandSetStrings;
  export = strings;
}

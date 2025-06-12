export const Export = (interfaceType?: string | symbol) => {
  console.log(interfaceType);
  return (constructor: Function) => {};
};

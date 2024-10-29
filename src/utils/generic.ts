export const reverseObj = (obj: any) => {
  return Object.entries(obj).reduce((acc: any, [key, value]: [any, any]) => {
    acc[value] = key;
    return acc;
  }, {});
};


export default listTargetObjects = (obj) => {
  const targetObjects = [];
  
  const traverse = (currentObj, isSubKeyLevel) => {
    if(currentObj){
      Object.keys(currentObj).forEach(key => {
        const value = currentObj[key];
        if (typeof value === 'object' && value !== null) {
          if (isSubKeyLevel) {
            targetObjects.push(value);
          }else{
            traverse(value, true);
          }
        }
      });
    }
  };
  
  traverse(obj, false);

  return targetObjects;
};
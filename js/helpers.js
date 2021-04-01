export function comprehensionGetElemen(...theArgs) {
  try {
    var res = {};
    theArgs.forEach((arg) => {
      arg = arg.split(".");
      if (arg[0] == "") {
        arg[0] = arg[1];
      }
      res[`${arg[0]}`] = document.getElementById(arg[1]).value;
    });
    return res;
  } catch (error) {
    console.log("Error", error);
  }
}

export function hi(name) {
  const res = `hi, ${name}`;
  console.log(res);
  return res;
}

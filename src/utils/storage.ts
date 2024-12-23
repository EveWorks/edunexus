export function setMLoading(value: string) {
  //   const loading = value === true ? "1" : "2";
  console.log("set loading", value);
  localStorage.setItem("loading", value?.toString());
}

// Function to get the value of 'loading' from localStorage
export function getMLoading() {
  const loading = localStorage.getItem("loading") || "1";
  return loading?.toString();
  //   return loading === "1" ? true : false;
}

export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export const getPDRColor = (value) => {
  if (value >= 75) {
    return "#72C040";
  }

  if (value >= 60) {
    return "#EFAF41";
  }

  return "#EC5B56";
};

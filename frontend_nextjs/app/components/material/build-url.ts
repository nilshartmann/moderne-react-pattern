export function buildUrl(
  path: string | null | undefined,
  newParams: Record<
    string,
    string | number | boolean | undefined | null | string[]
  >,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(newParams)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((element) => {
          params.append(key, element.toString());
        });
      } else {
        params.append(key, value.toString());
      }
    }
  }

  // console.log("newParams", newParams, "params", params);

  const paramsString = params.toString();

  if (!path) {
    if (!paramsString) {
      return "";
    }

    return `?${paramsString}`;
  }

  if (!paramsString) {
    return path;
  }

  return `${path}?${paramsString}`;
}

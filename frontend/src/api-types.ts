import z from "zod";

export type CategoryDto = z.infer<typeof CategoryDto>;
export const CategoryDto = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string(),
});

export type DifficultyLevel = z.infer<typeof DifficultyLevel>;
export const DifficultyLevel = z.unknown();

export type RecipeDto = z.infer<typeof RecipeDto>;
export const RecipeDto = z.object({
  id: z.number(),
  userFullname: z.string(),
  title: z.string(),
  headline: z.string(),
  preparationTime: z.number(),
  cookTime: z.number(),
  categories: z.array(CategoryDto),
  difficulty: DifficultyLevel,
});

export type PageResponseRecipeDto = z.infer<typeof PageResponseRecipeDto>;
export const PageResponseRecipeDto = z.object({
  content: z.array(RecipeDto),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export type get_Recipes = typeof get_Recipes;
export const get_Recipes = {
  method: z.literal("GET"),
  path: z.literal("/api/recipes"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      size: z.number().optional(),
      sort: z.array(z.string()).optional(),
    }),
  }),
  response: PageResponseRecipeDto,
};

// <EndpointByMethod>
export const EndpointByMethod = {
  get: {
    "/api/recipes": get_Recipes,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never
  ? [config?: T]
  : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("get", this.baseUrl + path, params[0]) as Promise<
      z.infer<TEndpoint["response"]>
    >;
  }
  // </ApiClient.get>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient

import { API_BASE_URL, API_KEY_SALT } from "@app/constants";
import { refreshToken } from "@app/storage";
import md5 from "md5";

import { AccountService } from "./AccountService";
import { AuthService } from "./AuthService";
import { CacheService } from "./CacheService";
import { CategoryService } from "./CategoryService";
import { ClientService } from "./ClientService";
import { CurrencyService } from "./CurrencyService";
import { HttpService } from "./HttpService";
import { SkinService } from "./SkinService";
import { TaskService } from "./TaskService";
import { TransactionService } from "./TransactionService";
import { UserService } from "./UserService";

export * from "./consts";
export * from "./types";

function buildServices() {
  const httpClient = new HttpService(API_BASE_URL);

  /** HTTP client which sends Api-Key in headers to ensure access to API */
  const apiKeyHttpClient = new HttpService(API_BASE_URL);
  if (refreshToken.value) apiKeyHttpClient.accessToken = refreshToken.value;

  /** HTTP client which we use for services that request private user data */
  const authUserHttpClient = new HttpService(API_BASE_URL);

  const authService = new AuthService(apiKeyHttpClient, refreshToken);
  const accountService = new AccountService(authUserHttpClient);
  const categoryService = new CategoryService();
  const clientService = new ClientService(httpClient);
  const cacheService = new CacheService();
  const currencyService = new CurrencyService(authUserHttpClient, cacheService, clientService);
  const skinService = new SkinService();
  const taskService = new TaskService(authUserHttpClient);
  const transactionService = new TransactionService(authUserHttpClient);
  const userService = new UserService(authUserHttpClient);

  clientService.on("connectionSuccess", () => {
    apiKeyHttpClient.headers['Api-Key'] = md5(API_KEY_SALT + md5(clientService.ip));
  });

  refreshToken.on("change", (token) => {
    apiKeyHttpClient.accessToken = token;
    if (token) {
      setTimeout(() => {
        authService.getRefreshToken()
          .then(({ access_token }) => {
            authUserHttpClient.accessToken = access_token;
          });
      }, 900000);
    }
  });

  return {
    authService,
    authUserHttpClient,
    accountService,
    categoryService,
    cacheService,
    clientService,
    currencyService,
    httpClient,
    skinService,
    taskService,
    transactionService,
    userService
  }
}

export const {
  authService,
  authUserHttpClient,
  accountService,
  categoryService,
  cacheService,
  clientService,
  currencyService,
  skinService,
  taskService,
  transactionService,
  userService,
  httpClient
} = buildServices();

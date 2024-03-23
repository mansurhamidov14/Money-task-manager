import { API_BASE_URL, CURRENCY_RATES_ACCESS_SALT } from "@app/constants";
import { accountCollection, taskCollection, transactionCollection } from "@app/db";
import { StorageItem } from "@app/entities";
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
  const accessKeyHttpClient = new HttpService(API_BASE_URL);
  const httpClient = new HttpService(API_BASE_URL);
  const authUserHttpClient = new HttpService(API_BASE_URL);

  const accessTokenItem = new StorageItem<string | null>({
    accessor: 'access_token',
    initialValue: null,
  });
  accessTokenItem.onChange((token) => {
    if (!token) {
      delete authUserHttpClient.headers.Authorization;
      return;
    }
    authUserHttpClient.headers.Authorization = `Bearer ${token}`;
  });

  const clientService = new ClientService(httpClient);
  clientService.onConnectionSuccess(() => {
    accessKeyHttpClient.headers['Access-Key'] = md5(CURRENCY_RATES_ACCESS_SALT + md5(clientService.ip));
  });

  const authService = new AuthService(accessKeyHttpClient, accessTokenItem);
  const accountService = new AccountService(accountCollection);
  const categoryService = new CategoryService();
  const cacheService = new CacheService();
  const currencyService = new CurrencyService(accessKeyHttpClient, cacheService, clientService);
  const skinService = new SkinService();
  const taskService = new TaskService(taskCollection);
  const transactionService = new TransactionService(transactionCollection);
  const userService = new UserService(authUserHttpClient, accessTokenItem);

  return {
    authService,
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
  accountService,
  categoryService,
  cacheService,
  clientService,
  currencyService,
  skinService,
  taskService,
  transactionService,
  httpClient
} = buildServices();

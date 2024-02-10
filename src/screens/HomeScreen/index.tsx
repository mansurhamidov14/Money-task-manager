import { ThemeToggleButton, VerticalScroll } from "@app/components";
import { Message } from "@app/i18n";
import { Await, accountsStore, user } from "@app/stores";
import { AccountsSlider, LatestTransactions, TasksOfTheDay } from "./components";


export function HomeScreen() {
  const currentUser = user.currentUser().data!;

  return (
    <VerticalScroll hasBottomNavigation>
      <main class="p-3">
        <div class="flex justify-end items-start gap-2">
          <div class="flex-1 text-lg font-semibold flex gap-3 pt-2 items-center">
            <img class="w-12 h-12 rounded-full border-secondary-200 dark:border-gray-600 border-4" src={currentUser.avatar} />
            <Message name={currentUser.firstName}>HomeScreen.greeting</Message>
          </div>
          <ThemeToggleButton />
        </div>
        <Await for={[accountsStore.accounts()]}>
          <AccountsSlider />
        </Await>
        <LatestTransactions />
        <TasksOfTheDay />
      </main>
    </VerticalScroll>
  );
}

import { createQuery } from "@tanstack/solid-query";
import { ApexChartProps, SolidApexCharts } from "solid-apexcharts";
import { Accessor, Show, createMemo } from "solid-js";
import { Loading, SectionTitle } from "@app/components";
import { useDateProcessor } from "@app/providers";
import { groupBy } from "@app/helpers";
import { Message, t } from "@app/i18n";
import {
  categoryService,
  CategoryId,
  currencyService,
  type CurrencyCode
} from "@app/services";
import { Transaction, accountsStore, themeStore } from "@app/stores";
import { DateFilter } from "../types";

export function PieCharts(props: {
  transactions: Accessor<Transaction[]>;
  dateFilter: Accessor<DateFilter>
}) {
  const { theme } = themeStore;
  const dateProcessor = useDateProcessor();
  const processedTransactions = createMemo(() => (
    props.transactions().filter(t => t.type === "expense" && t.category !== "transferBetweenAccounts")
  ));
  const primaryCurrency = createMemo(() => accountsStore.primaryAccount()!.currency);
  const currencyRatesQuery = createQuery(() => {
    const _primaryCurrency = primaryCurrency();
    const lastFilterDate = props.dateFilter().endDate;
    const todayDate = dateProcessor.today.date.toDatePickerString();
    const ratesDate = lastFilterDate > todayDate ? todayDate : lastFilterDate;
    const currencies = processedTransactions().reduce((result, transaction) => {
      if (transaction.currency === _primaryCurrency || result.includes(transaction.currency)) {
        return result;
      }
      return [...result, transaction.currency]
    }, [] as CurrencyCode[]);
    const accessKey = [ratesDate, _primaryCurrency, currencies.join("")];
    return ({
      queryKey: accessKey,
      queryFn: () => currencyService.getRates(_primaryCurrency, currencies, ratesDate),
    });
  })
  
  const chartData = createMemo<ApexChartProps | null>(() => {
    if (currencyRatesQuery.isSuccess) {
      const currencyRates = currencyRatesQuery.data;
      const categoryGroups = groupBy(
        processedTransactions(),
        ({ category }) => category
      );
  
      const categoryNames: string[] = [];
      const colors: string[] = [];
      const series: number[] = [];
      Object.entries(categoryGroups).forEach(([cat, transactions]) => {
        const categoryColors = categoryService.getColors(cat as CategoryId);
        categoryNames.push(t(`Category.${cat}`));
        colors.push(categoryColors.icon);
        series.push(
          transactions
            .reduce(
              (sum, transaction) => transaction.currency === primaryCurrency()
                ? sum + transaction.amount
                : sum + transaction.amount / currencyRates[transaction.currency],
              0
            )
        );
      });
      return {
        type: "pie",
        options: {
          stroke: {
            colors: theme() === "dark" ? ["#1f2937"] : ["#f3f4f6"],
            width: 3
          },
          chart: {
            foreColor: theme() === "dark" ? "#FFF" : "#000",
            height: 300
          },
          tooltip: {
            y: {
              formatter: (value: number) => {
                return `≈ ${currencyService.formatValue(primaryCurrency(), value)}`;
              }
            },
            theme: "dark"
          },
          colors,
          labels: categoryNames,
          fill: { colors },
          legend: {
            position: "bottom",
          },
        },
        series,
      }
    }
    return null;
  });

  return (
    <div class="pb-4 text-center">
      <Show when={currencyRatesQuery.isSuccess} fallback={<div class="min-h-[7rem]"><Loading /></div>}>
        <Show when={chartData() && processedTransactions().length}>
          <SolidApexCharts {...chartData()!} />
          <SectionTitle>
            <Message>HistoryScreen.charts.expensesStatistics</Message>
          </SectionTitle>
        </Show>
      </Show>
    </div>
  )
}
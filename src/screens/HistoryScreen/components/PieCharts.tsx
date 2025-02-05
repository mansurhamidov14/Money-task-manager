import { Loading, SectionTitle } from "@app/components";
import { CategoryId, CurrencyCode, Transaction } from "@app/entities";
import { groupBy } from "@app/helpers";
import { useAccounts } from "@app/hooks";
import { Message, t } from "@app/i18n";
import { useDateProcessor } from "@app/providers";
import {
  categoryService,
  currencyService,
} from "@app/services";
import { themeStore } from "@app/stores";
import { createQuery } from "@tanstack/solid-query";
import { ApexChartProps, SolidApexCharts } from "solid-apexcharts";
import { Accessor, Show, createMemo } from "solid-js";
import { DateFilter } from "../types";

export function PieCharts(props: {
  transactions: Transaction[];
  dateFilter: Accessor<DateFilter>
}) {
  const { theme } = themeStore;
  const { primaryAccount } = useAccounts();
  const dateProcessor = useDateProcessor();
  const processedTransactions = createMemo(() => (
    props.transactions.filter(t => t.type === "expense" && t.category !== "transferBetweenAccounts")
  ));
  const primaryCurrency = createMemo(() => primaryAccount()!.currency);
  const currencyRatesQuery = createQuery(() => {
    const _primaryCurrency = primaryCurrency();
    const lastFilterDate = props.dateFilter().toDate;
    const todayDate = dateProcessor.today.date.toDatePickerString();
    const ratesDate = lastFilterDate > todayDate ? todayDate : lastFilterDate;
    const currencies = processedTransactions().reduce((result, transaction) => {
      if (transaction.account.currency === _primaryCurrency || result.includes(transaction.account.currency)) {
        return result;
      }
      return [...result, transaction.account.currency]
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
              (sum, transaction) => transaction.account.currency === primaryCurrency()
                ? sum + transaction.amount
                : sum + transaction.amount / currencyRates[transaction.account.currency],
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
            height: 360
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
            formatter(legendName, opts) {
              return `${legendName} (<strong>${currencyService.formatValue(primaryCurrency(), opts.w.config.series[opts.seriesIndex])}</strong>)`;
            },
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
          <div class="text-center mt-1 font-semibold">
            <Message>HistoryScreen.charts.totalExpenses</Message>
            <span class="font-bold">
              &nbsp;&nbsp;{currencyService.formatValue(
                primaryCurrency(),
                (chartData()!.series as number[]).reduce((a, b) => a + b, 0)
              )}
            </span>
          </div>
          <SectionTitle>
            <Message>HistoryScreen.charts.expensesStatistics</Message>
          </SectionTitle>
        </Show>
      </Show>
    </div>
  )
}
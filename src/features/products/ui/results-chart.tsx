import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";
import { Label, LabelList, Pie, PieChart } from "recharts";
const chartConfig = {
  carbs: {
    label: "Углеводы",
    color: " var(--color-teal-300)",
  },
  protein: {
    label: "Белки",
    color: "var(--chart-2)",
  },
  fat: {
    label: "Жиры",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;
export function ResultsChart({
  chartData,
  totalKcal,
}: {
  chartData: {
    percent: number;
    kcal: number;
    grams: number;
    element: string;
  }[];
  totalKcal: number;
}) {
  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart>
          <Pie data={chartData} dataKey="kcal" innerRadius={60} strokeWidth={2}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalKcal}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        kcal
                      </tspan>
                    </text>
                  );
                }
              }}
            />
            <LabelList
              dataKey="kcal"
              className="fill-background"
              stroke="none"
              fontSize={12}
              // formatter={(value: keyof typeof chartConfig) =>
              //   chartConfig[value]?.label
              // }
            />
          </Pie>
        </PieChart>

        {/* <BarChart accessibilityLayer data={chartData} margin={{ top: 50 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="element"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />

          <Bar dataKey="kcal" fill="var(--color-carbs)" radius={8}>
            <LabelList
              position="top"
              offset={10}
              className="fill-foreground"
              fontSize={20}
            />
          </Bar>
          <Bar dataKey="grams" fill="var(--color-fat)" radius={8}>
            <LabelList
              position="top"
              offset={10}
              className="fill-foreground"
              fontSize={20}
            />
          </Bar>
        </BarChart> */}
      </ChartContainer>
    </>
  );
}

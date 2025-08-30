import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";
import { Cell, Label, LabelList, Pie, PieChart } from "recharts";

const c1 = "oklch(0.70 0.19 48)";
const c2 = "oklch(0.75 0.14 233)";
const c3 = "oklch(0.54 0.25 293)";
const chartConfig = {
  carbs: {
    label: "Углеводы",
    color: c1,
  },
  protein: {
    label: "Белки",
    color: c2,
  },
  fat: {
    label: "Жиры",
    color: c3,
  },
} satisfies ChartConfig;
export default function ResultsChart({
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
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <PieChart>
          <defs>
            <linearGradient id="fillCarbs">
              <stop offset="5%" stopColor={c1} stopOpacity={0.8} />
              <stop offset="95%" stopColor={c1} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="fillProtein">
              <stop offset="5%" stopColor={c2} stopOpacity={0.8} />
              <stop offset="95%" stopColor={c2} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="fillFat">
              <stop offset="5%" stopColor={c3} stopOpacity={0.8} />
              <stop offset="95%" stopColor={c3} stopOpacity={0.5} />
            </linearGradient>
            {/* <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient> */}
          </defs>
          <Pie data={chartData} dataKey="kcal" innerRadius={70} strokeWidth={2}>
            <Cell fill="url(#fillCarbs)" />
            <Cell fill="url(#fillProtein)" />
            <Cell fill="url(#fillFat)" />
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
              className="fill-foreground "
              stroke="none"
              strokeWidth={2}
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

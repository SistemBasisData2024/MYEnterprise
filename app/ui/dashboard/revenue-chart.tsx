import { fetchRevenue } from "@/app/lib/data";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RevenueChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    fetchRevenue().then((revenue) => {
      if (chartRef.current && revenue) {
        const ctx = (chartRef.current as HTMLCanvasElement).getContext("2d");
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: revenue.map((r) => r.month),
              datasets: [
                {
                  label: "Revenue",
                  data: revenue.map((r) => r.revenue),
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }
    });
  }, []);

  return <canvas ref={chartRef} />;
}

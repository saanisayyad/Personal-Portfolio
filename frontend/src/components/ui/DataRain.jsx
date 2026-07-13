import { motion } from "framer-motion";
import { useMemo } from "react";

const keywords = [
  "SELECT * FROM Sales",
  "GROUP BY Region",
  "ORDER BY Revenue DESC",
  "INNER JOIN Customers",
  "LEFT JOIN Orders",
  "WHERE Profit > 1000",
  "COUNT(CustomerID)",
  "SUM(Sales)",
  "AVG(Revenue)",
  "ROW_NUMBER()",
  "RANK() OVER()",
  "DENSE_RANK()",
  "SQL",
  "Python",
  "Pandas",
  "NumPy",
  "Power BI",
  "Excel",
  "Dashboard",
  "KPI",
  "Forecast",
  "Insights",
  "Visualization",
  "Correlation",
  "Regression",
  "ETL Pipeline",
  "Data Cleaning",
  "customer_sales.csv",
  "sales_dashboard.pbix",
  "import pandas as pd",
  "df.groupby('Category')",
  "plt.scatter(x, y)",
  "sns.heatmap(df.corr())",
  "Revenue ↑",
  "Profit Margin",
  "Business Intelligence",
];

const DataRain = () => {
  const items = useMemo(
    () =>
      keywords.map((text) => ({
        text,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 12 + Math.random() * 8,
        rotate: -20 + Math.random() * 40,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 8,
        x: -80 + Math.random() * 160,
        y: -60 + Math.random() * 120,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={false}
          className="absolute whitespace-nowrap font-mono font-medium text-cyan-400/10"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            rotate: `${item.rotate}deg`,
            willChange: "transform",
          }}
          animate={{
            x: [0, item.x, -item.x, 0],
            y: [0, item.y, -item.y, 0],
            rotate: [
              item.rotate,
              item.rotate + 6,
              item.rotate - 6,
              item.rotate,
            ],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
};

export default DataRain;
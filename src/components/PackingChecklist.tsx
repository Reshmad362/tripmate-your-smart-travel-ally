import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Backpack } from "lucide-react";

interface PackingChecklistProps {
  destination: string;
  duration: number;
  weather?: string;
}

export const PackingChecklist = ({ destination, duration, weather }: PackingChecklistProps) => {
  const generateChecklist = () => {
    const essentials = [
      "Passport & ID",
      "Travel insurance documents",
      "Credit cards & cash",
      "Phone & charger",
      "Medications",
    ];

    const clothing = [
      `${duration * 2} sets of clothing`,
      "Comfortable walking shoes",
      "Jacket or sweater",
      weather?.includes("Rain") ? "Raincoat or umbrella" : null,
      weather?.includes("Snow") ? "Winter coat & boots" : null,
      "Sleepwear",
      "Underwear & socks",
    ].filter(Boolean) as string[];

    const toiletries = [
      "Toothbrush & toothpaste",
      "Shampoo & soap",
      "Sunscreen",
      "Personal hygiene items",
    ];

    const electronics = [
      "Camera",
      "Power bank",
      "Universal adapter",
      "Headphones",
    ];

    return { essentials, clothing, toiletries, electronics };
  };

  const checklist = generateChecklist();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleCheck = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const CategorySection = ({ title, items }: { title: string; items: string[] }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={item}
              checked={checked[item] || false}
              onCheckedChange={() => handleCheck(item)}
            />
            <label
              htmlFor={item}
              className={`text-sm cursor-pointer ${
                checked[item] ? "line-through text-muted-foreground" : "text-foreground"
              }`}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const totalItems = Object.keys(checklist).reduce(
    (acc, key) => acc + checklist[key as keyof typeof checklist].length,
    0
  );
  const checkedItems = Object.keys(checked).filter((key) => checked[key]).length;

  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Backpack className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Packing Checklist</h3>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {checkedItems}/{totalItems} packed
        </span>
      </div>

      <div className="space-y-4">
        <CategorySection title="✈️ Essentials" items={checklist.essentials} />
        <CategorySection title="👕 Clothing" items={checklist.clothing} />
        <CategorySection title="🧴 Toiletries" items={checklist.toiletries} />
        <CategorySection title="🔌 Electronics" items={checklist.electronics} />
      </div>

      {checkedItems === totalItems && totalItems > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-primary/10 text-center">
          <p className="text-sm font-medium text-primary">
            🎉 All packed! Ready for your adventure!
          </p>
        </div>
      )}
    </Card>
  );
};

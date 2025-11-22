import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";

interface CarbonFootprintCardProps {
  totalCarbonKg: number;
}

export const CarbonFootprintCard = ({ totalCarbonKg }: CarbonFootprintCardProps) => {
  const getImpactLevel = (kg: number) => {
    if (kg < 10) return { label: "Green", color: "text-green-500", bg: "bg-green-500/10" };
    if (kg < 50) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { label: "High Impact", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const impact = getImpactLevel(totalCarbonKg);
  const treesNeeded = Math.ceil(totalCarbonKg / 21); // 1 tree absorbs ~21kg CO2/year

  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <Leaf className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Carbon Footprint</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Emissions</span>
          <span className="text-2xl font-bold text-foreground">{totalCarbonKg.toFixed(1)} kg CO₂</span>
        </div>
        
        <div className={`flex items-center justify-between p-3 rounded-lg ${impact.bg}`}>
          <span className="text-sm font-medium">Impact Level</span>
          <span className={`text-sm font-bold ${impact.color}`}>{impact.label}</span>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            🌳 Plant {treesNeeded} tree{treesNeeded > 1 ? 's' : ''} to offset this trip
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-semibold text-foreground">Eco-Friendly Tips:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use public transport when possible</li>
            <li>• Walk or bike for short distances</li>
            <li>• Choose eco-certified accommodations</li>
            <li>• Carry reusable water bottles</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

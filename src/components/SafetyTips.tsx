import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Phone, Heart } from "lucide-react";

interface SafetyTipsProps {
  destination: string;
}

export const SafetyTips = ({ destination }: SafetyTipsProps) => {
  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Safety & Health</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Emergency Numbers</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>🚨 Police: 112 (EU) / 911 (US)</li>
              <li>🚑 Ambulance: 112 (EU) / 911 (US)</li>
              <li>🏥 Find nearest hospital on arrival</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Stay Safe</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep copies of important documents</li>
              <li>• Share itinerary with family/friends</li>
              <li>• Avoid displaying valuables publicly</li>
              <li>• Use licensed taxis or ride-share apps</li>
              <li>• Stay in well-lit, populated areas at night</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Health Precautions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Bring prescription medications</li>
              <li>• Drink bottled water if advised</li>
              <li>• Pack basic first-aid kit</li>
              <li>• Check travel insurance coverage</li>
              <li>• Research local health facilities</li>
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 mt-4">
          <p className="text-xs text-foreground">
            💡 <strong>Pro tip:</strong> Register with your embassy upon arrival and download offline maps.
          </p>
        </div>
      </div>
    </Card>
  );
};

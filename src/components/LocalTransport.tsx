import { Card } from "@/components/ui/card";
import { Bus, Train, Car, Bike } from "lucide-react";

interface LocalTransportProps {
  destination: string;
}

export const LocalTransport = ({ destination }: LocalTransportProps) => {
  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <Bus className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Local Transport Guide</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3 items-start">
          <Train className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Metro & Train</h4>
            <p className="text-sm text-muted-foreground">
              Most efficient for city travel. Get a multi-day pass for savings. Download the official metro app.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Bus className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Buses & Trams</h4>
            <p className="text-sm text-muted-foreground">
              Great for sightseeing. Look for hop-on-hop-off tourist buses for main attractions.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Car className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Taxis & Ride-Share</h4>
            <p className="text-sm text-muted-foreground">
              Use official taxi stands or apps like Uber/Bolt. Always verify driver details before entering.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Bikes & Scooters</h4>
            <p className="text-sm text-muted-foreground">
              Eco-friendly option. Many cities have bike-sharing systems. Check for dedicated bike lanes.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-secondary/10 mt-4 space-y-2">
          <p className="text-xs font-semibold text-foreground">💳 Money-Saving Tips:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Buy day/week passes instead of single tickets</li>
            <li>• Walk between nearby attractions</li>
            <li>• Consider city tourist cards (transport + attractions)</li>
            <li>• Download offline maps and transport apps</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

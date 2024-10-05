import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MeasurementPopup() {
  const [measurement] = useState(45.9); // Value is static, so no setter needed
  const [unit, setUnit] = useState('Kilometers');

  return (
    <Card className="absolute w-[500px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Measurement</CardTitle>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="distance">Distance Measurement</TabsTrigger>
            <TabsTrigger value="area">Area Measurement</TabsTrigger>
          </TabsList>
          <TabsContent value="distance" className="space-y-4">
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kilometers">Kilometers</SelectItem>
                <SelectItem value="Miles">Miles</SelectItem>
                <SelectItem value="Meters">Meters</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-center">
              <div className="text-7xl font-bold">{measurement.toFixed(1)}</div>
              <div className="text-xl">{unit}</div>
            </div>
          </TabsContent>
          <TabsContent value="area">
            <p className="text-sm text-muted-foreground">
              Area measurement functionality not implemented in this example.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

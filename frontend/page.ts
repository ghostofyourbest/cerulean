// React + TypeScript + Tailwind (shadcn/ui style)
// Mobile-friendly pricing form with dynamic fee inputs

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Fee {
  type: "flat" | "percentage" | "recurring";
  amount: number;
  description: string;
}

export default function PricingForm() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenorMonths, setTenorMonths] = useState(0);
  const [marginBps, setMarginBps] = useState(0);
  const [baseRate, setBaseRate] = useState("SONIA");
  const [fees, setFees] = useState<Fee[]>([]);

  const addFee = () => {
    setFees([...fees, { type: "flat", amount: 0, description: "" }]);
  };

  const updateFee = (index: number, key: keyof Fee, value: any) => {
    const updated = [...fees];
    updated[index][key] = value;
    setFees(updated);
  };

  const removeFee = (index: number) => {
    const updated = [...fees];
    updated.splice(index, 1);
    setFees(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      loan_amount: loanAmount,
      tenor_months: tenorMonths,
      margin_bps: marginBps,
      base_rate: baseRate,
      fees,
    };
    console.log("Submitting:", payload);
    // TODO: POST to backend /price-deal and handle response
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="space-y-4 py-6">
          <div>
            <Label>Loan Amount (£)</Label>
            <Input type="number" value={loanAmount} onChange={e => setLoanAmount(+e.target.value)} />
          </div>
          <div>
            <Label>Tenor (Months)</Label>
            <Input type="number" value={tenorMonths} onChange={e => setTenorMonths(+e.target.value)} />
          </div>
          <div>
            <Label>Margin (bps)</Label>
            <Input type="number" value={marginBps} onChange={e => setMarginBps(+e.target.value)} />
          </div>
          <div>
            <Label>Base Rate</Label>
            <Input value={baseRate} onChange={e => setBaseRate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Fees</Label>
            {fees.map((fee, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-end">
                <select
                  className="border rounded p-2"
                  value={fee.type}
                  onChange={e => updateFee(index, "type", e.target.value)}
                >
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
                  <option value="recurring">Recurring</option>
                </select>
                <Input
                  type="number"
                  value={fee.amount}
                  onChange={e => updateFee(index, "amount", +e.target.value)}
                />
                <Input
                  value={fee.description}
                  onChange={e => updateFee(index, "description", e.target.value)}
                />
                <Button variant="destructive" onClick={() => removeFee(index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={addFee}>Add Fee</Button>
          </div>

          <Button className="w-full" onClick={handleSubmit}>Calculate Pricing</Button>
        </CardContent>
      </Card>
    </div>
  );
}

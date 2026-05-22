"use client";

import * as React from "react";
import { CreditCard, Check, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["1 Project", "100 Keywords", "5 Audits/month", "Basic AI Chat"],
    current: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: [
      "10 Projects",
      "5,000 Keywords",
      "Unlimited Audits",
      "Full AI Chat",
      "Content Writer",
      "Rank Tracker",
      "Priority Support",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Agency",
    price: "$199",
    period: "/month",
    features: [
      "Unlimited Projects",
      "50,000 Keywords",
      "Unlimited Audits",
      "Full AI Suite",
      "White Label Reports",
      "Team Collaboration",
      "API Access",
      "Dedicated Support",
    ],
    current: false,
  },
];

const usage = [
  { label: "Keywords Tracked", used: 1247, limit: 5000 },
  { label: "Audits This Month", used: 12, limit: 999 },
  { label: "AI Chat Messages", used: 89, limit: 500 },
  { label: "Content Articles", used: 8, limit: 50 },
];

const invoices = [
  { date: "Jan 15, 2024", amount: "$49.00", status: "Paid" },
  { date: "Dec 15, 2023", amount: "$49.00", status: "Paid" },
  { date: "Nov 15, 2023", amount: "$49.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription plan and billing information."
      />

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Current Plan</CardTitle>
              <CardDescription>You are currently on the Pro plan.</CardDescription>
            </div>
            <Badge className="gap-1">
              <Zap className="h-3 w-3" />
              Pro
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {usage.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">
                    {item.used}/{item.limit === 999 ? "Unlimited" : item.limit}
                  </span>
                </div>
                <Progress value={(item.used / item.limit) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary shadow-md relative" : ""}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.current ? "outline" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.date} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{invoice.date}</p>
                    <p className="text-xs text-muted-foreground">{invoice.amount}</p>
                  </div>
                </div>
                <Badge variant="outline">{invoice.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { CreditsUsage } from "@/types";

export const useCredits = () => {
  const [credits, setCredits] = useState<CreditsUsage>({
    totalCredits: 100,
    usedCredits: 45,
    remainingCredits: 55,
    history: [
      {
        date: "2024-01-15",
        action: "unlock_report",
        credits: 2,
        description: "Déblocage rapport @marie_lifestyle",
      },
      {
        date: "2024-01-14",
        action: "search",
        credits: 5,
        description: "Recherche influenceurs mode",
      },
      {
        date: "2024-01-10",
        action: "purchase",
        credits: -50,
        description: "Achat package 50 crédits",
      },
    ],
  });

  const unlockReports = (influencerIds: string[]) => {
    const creditsNeeded = influencerIds.length * 2;
    
    if (credits.remainingCredits >= creditsNeeded) {
      setCredits((prev) => ({
        ...prev,
        usedCredits: prev.usedCredits + creditsNeeded,
        remainingCredits: prev.remainingCredits - creditsNeeded,
        history: [
          {
            date: new Date().toISOString().split("T")[0],
            action: "unlock_report",
            credits: creditsNeeded,
            description: `Déblocage ${influencerIds.length} rapport(s)`,
          },
          ...prev.history,
        ],
      }));
      return true;
    }
    
    return false;
  };

  const purchaseCredits = (amount: number) => {
    setCredits((prev) => ({
      ...prev,
      totalCredits: prev.totalCredits + amount,
      remainingCredits: prev.remainingCredits + amount,
      history: [
        {
          date: new Date().toISOString().split("T")[0],
          action: "purchase",
          credits: -amount,
          description: `Achat package ${amount} crédits`,
        },
        ...prev.history,
      ],
    }));
  };

  const getCreditsForAction = (action: string) => {
    const costs = {
      unlock_report: 2,
      search: 5,
      export_detailed: 1,
    };
    return costs[action as keyof typeof costs] || 0;
  };

  return {
    credits,
    unlockReports,
    purchaseCredits,
    getCreditsForAction,
  };
}; 
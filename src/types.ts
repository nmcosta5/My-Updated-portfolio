export interface Mission {
  id: string;
  name: string;
  category: string;
  desc: string;
  longDesc: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  color: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "LEGENDARY";
  stats: {
    intel: number;
    security: number;
    compute: number;
  };
}

export interface SkillItem {
  name: string;
  level: number;
  category: "FRONTEND" | "BACKEND" | "SYSTEMS" | "TOOLS";
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  description: string;
}

export interface CampaignMilestone {
  year: string;
  phase: string;
  title: string;
  institution: string;
  description: string;
  status: "COMPLETED" | "ACTIVE" | "LOCKED";
}


import {
  Briefcase,
  HeartPulse,
  MessageCircle,
  Users,
  ShoppingCart,
  Megaphone,
  SearchCheck,
  Code,
  ServerCog,
  Home,
  GanttChartSquare,
} from 'lucide-react';
import { IconGeneral } from '@/lib/icons';
import React from 'react';

export const categories = [
  { name: 'Show All', icon: IconGeneral },
  { name: 'Finance', icon: Briefcase },
  { name: 'Human Resources', icon: Users },
  { name: 'Sales', icon: ShoppingCart },
  { name: 'Marketing', icon: Megaphone },
  { name: 'Real Estate', icon: Home },
  { name: 'IT Operations', icon: ServerCog },
  { name: 'Procurement', icon: SearchCheck },
  { name: 'Development', icon: Code },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Admin and Ops', icon: GanttChartSquare },
  { name: 'CS and Support', icon: MessageCircle },
];

export const categoryStyles: { [key: string]: { icon: React.ElementType, iconBg: string, color: string } } = {
  'Finance': { icon: Briefcase, iconBg: "bg-primary/10", color: "text-primary" },
  'Human Resources': { icon: Users, iconBg: "bg-accent/10", color: "text-accent" },
  'Sales': { icon: ShoppingCart, iconBg: "bg-secondary/50", color: "text-secondary-foreground" },
  'Marketing': { icon: Megaphone, iconBg: "bg-primary/10", color: "text-primary" },
  'Real Estate': { icon: Home, iconBg: "bg-accent/10", color: "text-accent" },
  'IT Operations': { icon: ServerCog, iconBg: "bg-secondary/50", color: "text-secondary-foreground" },
  'Procurement': { icon: SearchCheck, iconBg: "bg-primary/10", color: "text-primary" },
  'Development': { icon: Code, iconBg: "bg-accent/10", color: "text-accent" },
  'Healthcare': { icon: HeartPulse, iconBg: "bg-secondary/50", color: "text-secondary-foreground" },
  'Admin and Ops': { icon: GanttChartSquare, iconBg: "bg-primary/10", color: "text-primary" },
  'CS and Support': { icon: MessageCircle, iconBg: "bg-accent/10", color: "text-accent" },
  'General': { icon: IconGeneral, iconBg: "bg-muted", color: "text-muted-foreground" },
  'Show All': { icon: IconGeneral, iconBg: "bg-muted", color: "text-muted-foreground" },
};

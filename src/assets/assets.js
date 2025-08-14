import logo from './logo.png';
import auth_bg from './auth_bg.jpg';
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from 'lucide-react';

export const assets = {
  logo,
  auth_bg,
};

export const SIDEBAR_DATA = [
  {
    id: '01',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: '02',
    label: 'Category',
    icon: List,
    path: '/category',
  },
  {
    id: '03',
    label: 'Income',
    icon: Wallet,
    path: '/income',
  },
  {
    id: '04',
    label: 'Expense',
    icon: Coins,
    path: '/expense',
  },
  {
    id: '05',
    label: 'Filter',
    icon: FunnelPlus,
    path: '/filter',
  },
];
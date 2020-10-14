interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}



export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Properties',
    url: '/properties',
    icon: 'icon-home',
  },
  {
    name: 'Rent Payment',
    url: '/rentPayment',
    icon: 'icon-note',
  },
  {
    name: 'Move-in/Move-Out',
    url: '/moveInOut',
    icon: 'icon-directions',
  },
  {
    name: 'Bills / Utilities',
    url: '/billsUtilities',
    icon: 'icon-energy',
  },
  {
    name: 'Refer a Friend',
    url: '/referral',
    icon: 'icon-people',
  },
  {
    name: 'Documents',
    url: '/dashboard',
    icon: 'icon-doc',
  },
];

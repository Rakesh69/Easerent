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
    url: '/admin/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Properties',
    url: '/admin/properties',
    icon: 'icon-home',
  },
  {
    name: 'Rent Payment',
    url: '/admin//rentPayment',
    icon: 'icon-note',
  },
  {
    name: 'Move-in/Move-Out',
    url: '/admin/moveInOut',
    icon: 'icon-directions',
  },
  {
    name: 'Bills / Utilities',
    url: '/admin/billsUtilities',
    icon: 'icon-energy',
  },
  {
    name: 'Refer a Friend',
    url: '/admin/referral',
    icon: 'icon-people',
  },
  {
    name: 'Documents',
    url: '/admin/documents',
    icon: 'icon-doc',
  },
  {
    name: 'Tenants',
    url: '/admin/tenants',
    icon: 'icon-user-following',
  },

  {
    name: 'Payment',
    url: '/admin/payments',
    icon: 'fa fa-money fa-fw',
  },
];

export default [
  {
    path: '/demo',
    name: 'demo',
    component: './Demo',
  },
  {
    name: '配置',
    path: '/setting',
    component: './SettingTree',
  },
  {
    path: '/',
    redirect: '/demo',
  },
  {
    component: './404',
  },
];

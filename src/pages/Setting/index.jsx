import React from 'react';
import CustomBreadcrumb from '@/components/CustomBreadcrumb';
import Test from './Team';

const breadcrumb = [
  {
    link: '/#/order',
    text: '工单管理',
  },
  {
    link: '',
    text: 'Team管理',
  },
];
const Settings = () => (
  <div >
    <CustomBreadcrumb items={breadcrumb} title="Team" />
    <Test/>
         
  </div>

);

export default Settings;

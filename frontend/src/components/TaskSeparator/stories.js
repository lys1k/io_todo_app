import React from 'react';
import AppThemeProvider from 'providers/Theme';
import Component from '.';

export default {
  title: 'TaskSeparator',
  component: Component,
};

const Template = (args) => (
  <AppThemeProvider>
    <Component {...args} />
  </AppThemeProvider>
);

const Default = Template.bind({});

export { Default };

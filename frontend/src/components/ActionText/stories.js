import React from 'react';
import noop from 'lodash/noop';
import AppThemeProvider from 'providers/Theme';
import Component from '.';

export default {
  title: 'ActionText',
  component: Component,
};

const Template = (args) => (
  <AppThemeProvider>
    <Component {...args} />
  </AppThemeProvider>
);

const Default = Template.bind({});

Default.args = {
  children: 'Default',
  onClick: noop,
};

export { Default };

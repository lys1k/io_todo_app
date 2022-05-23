import React from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AppThemeProvider from 'providers/Theme';
import Component from '.';

export default {
  title: 'FilterButton',
  component: Component,
};

const Template = (args) => (
  <AppThemeProvider>
    <Component {...args} />
  </AppThemeProvider>
);

const Default = Template.bind({});
const Selected = Template.bind({});

Default.args = {
  title: 'Lista',
  Icon: PlaylistAddCheckIcon,
};

Selected.args = {
  ...Default.args,
  active: true,
};

export { Default, Selected };

import React from 'react';
import { Form, Formik } from 'formik';
import AppThemeProvider from 'providers/Theme';
import Component from '.';

export default {
  title: 'Input',
  component: Component,
};

const Template = (args) => (
  <AppThemeProvider>
    <Formik initialValues={{ input: 'content' }} onSubmit={() => {}}>
      <Form>
        <Component {...args} />
      </Form>
    </Formik>
  </AppThemeProvider>
);

const Default = Template.bind({});
const Error = Template.bind({});

Default.args = {
  label: 'My input',
  name: 'input',
};

Error.args = {
  ...Default.args,
  error: 'Please fill the field!',
};

export { Default, Error };

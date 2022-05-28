import React from 'react';
import { Form, Formik } from 'formik';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import Button from 'components/Button';
import Chip from 'components/Chip';
import Input from 'components/Input';
import styles from './styles';
import validation from './validation';

const ProfileView = ({ onSubmit, onDelete, onLogout, tags }) => {
  return (
    <Box>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ tagName: '' }}
        validationSchema={validation}
        enableReinitialize
      >
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h1">Preferencje</Typography>
            <Typography variant="h2" sx={styles.subtitle}>
              Tagi
            </Typography>
            <Box sx={styles.inputWrapper}>
              <Input name="tagName" label="Nazwa taga" sx={styles.input} />
              <Button submit sx={{ margin: 'auto' }}>
                Dodaj
              </Button>
            </Box>
          </Box>
        </Form>
      </Formik>
      <Box sx={{ marginTop: 20 }}>
        {map(tags, (entry) => (
          <Chip
            key={entry.id}
            title={entry.tagName}
            Icon={CloseIcon}
            onDelete={() => onDelete(entry.id)}
          />
        ))}
      </Box>
      <Button onClick={onLogout} sx={{ marginTop: 50 }}>
        Wyloguj
      </Button>
    </Box>
  );
};

ProfileView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ),
};

export default ProfileView;

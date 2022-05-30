import React from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { get, map, noop } from 'lodash';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import { optionsShape } from 'components/Select/shapes';
import {
  initialSubTaskData,
  initialTagData,
  initialPreviousTaskData,
} from './consts';
import styles from './styles';
import { getUniqueAvailableTasks, getUniqueTags } from './utils';
import validationSchema from './validation';

const TaskAddEdit = ({
  isEdit,
  onSubmit,
  availableTasks,
  initialValues,
  availableTags,
}) => {
  const deleteIconErrorStyles = { marginTop: -20 };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
    >
      {({ values, errors }) => (
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h1">Nowe zadanie</Typography>
            <Typography variant="h3" sx={styles.subtitle}>
              Podstawowe informacje
            </Typography>
            <Input name="name" label="Tytuł" sx={styles.input} />
            <Input name="description" label="Opis" sx={styles.input} />
            <Input
              name="date"
              label="Deadline"
              type="datetime-local"
              sx={styles.input}
            />
            <Typography variant="h3" sx={styles.subtitle}>
              Zadania poprzedzające
            </Typography>
            <FieldArray
              name="previousTasks"
              render={(arrayHelpers) => (
                <>
                  {map(values.previousTasks, (_, index) => (
                    <Box sx={styles.fieldWithDeleteWrapper} key={index}>
                      <Select
                        name={`previousTasks.${index}.id`}
                        label="Zadanie poprzedzające"
                        error={get(errors, `previousTasks[${index}].id`)}
                        options={getUniqueAvailableTasks(
                          availableTasks,
                          values.previousTasks,
                          values.previousTasks[index].id
                        )}
                        sx={styles.input}
                      />
                      <DeleteIcon
                        onClick={() => arrayHelpers.remove(index)}
                        sx={{
                          ...styles.deleteIcon,
                          ...(get(errors, `previousTasks[${index}]`) &&
                            deleteIconErrorStyles),
                        }}
                      />
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.insert(
                        values.previousTasks.length,
                        initialPreviousTaskData
                      )
                    }
                    size="small"
                    sx={styles.addField}
                  >
                    Dodaj zadanie poprzedzające
                  </Button>
                </>
              )}
            />
            <Typography variant="h3" sx={styles.subtitle}>
              Tagi
            </Typography>
            <FieldArray
              name="tags"
              render={(arrayHelpers) => (
                <>
                  {map(values.tags, (_, index) => (
                    <Box sx={styles.fieldWithDeleteWrapper} key={index}>
                      <Select
                        name={`tags.${index}.id`}
                        label="Tag"
                        error={get(errors, `tags[${index}].id`)}
                        options={getUniqueTags(
                          availableTags,
                          values.tags,
                          values.tags[index].id
                        )}
                        sx={styles.input}
                      />
                      <DeleteIcon
                        onClick={() => arrayHelpers.remove(index)}
                        sx={{
                          ...styles.deleteIcon,
                          ...(get(errors, `tags[${index}]`) &&
                            deleteIconErrorStyles),
                        }}
                      />
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.insert(values.tags.length, initialTagData)
                    }
                    size="small"
                    sx={styles.addField}
                  >
                    Dodaj tag
                  </Button>
                </>
              )}
            />
            <Typography variant="h3" sx={styles.subtitle}>
              Podzadania
            </Typography>
            <FieldArray
              name="subTasks"
              render={(arrayHelpers) => (
                <>
                  {map(values.subTasks, (_, index) => (
                    <Box sx={styles.fieldWithDeleteWrapper} key={index}>
                      <Input
                        name={`subTasks.${index}.name`}
                        label="Tytuł podzadania"
                        sx={styles.input}
                      />
                      <DeleteIcon
                        onClick={() => arrayHelpers.remove(index)}
                        sx={{
                          ...styles.deleteIcon,
                          ...(get(errors, `subTasks[${index}]`) &&
                            deleteIconErrorStyles),
                        }}
                      />
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.insert(
                        values.subTasks.length,
                        initialSubTaskData
                      )
                    }
                    size="small"
                    sx={styles.addField}
                  >
                    Dodaj podzadanie
                  </Button>
                </>
              )}
            />
            <Button submit sx={{ margin: 'auto', marginTop: 20 }}>
              {isEdit ? 'Zatwierdź' : 'Utwórz'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

TaskAddEdit.propTypes = {
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }),
  availableTasks: optionsShape,
  availableTags: optionsShape,
};

TaskAddEdit.defaultProps = {
  onSubmit: noop,
  initialValues: {},
  isEdit: false,
  availableTasks: [],
  availableTags: [],
};

export default TaskAddEdit;

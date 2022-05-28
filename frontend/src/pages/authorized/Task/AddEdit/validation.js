import * as Yup from 'yup';

const required = 'This field is required';

export default Yup.object({
  name: Yup.string().required(required),
  description: Yup.string().required(required),
  date: Yup.string().min(2, required).required(required),
  subTasks: Yup.array().of(
    Yup.object({
      name: Yup.string().required(required),
    })
  ),
  previousTasks: Yup.array().of(
    Yup.object({
      id: Yup.string().required(required),
    })
  ),
  tags: Yup.array().of(
    Yup.object({
      id: Yup.string().required(required),
    })
  ),
});

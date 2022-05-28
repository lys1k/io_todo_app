import * as Yup from 'yup';

const required = 'This field is required';

export default Yup.object({
  username: Yup.string().required(required),
  password: Yup.string().required(required),
});

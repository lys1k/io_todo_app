import * as Yup from 'yup';

const required = 'This field is required';

export default Yup.object({
  tagName: Yup.string().required(required),
});

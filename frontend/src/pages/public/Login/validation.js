import * as Yup from 'yup';
import { required } from 'consts/messages';

export default Yup.object({
  username: Yup.string().required(required),
  password: Yup.string().required(required),
});

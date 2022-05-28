import * as Yup from 'yup';
import { required } from 'consts/messages';

export default Yup.object({
  tagName: Yup.string().required(required),
});

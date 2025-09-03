import * as yup from "yup";

const albumValidationSchemas = yup.object().shape({
  albumName: yup.string().required('Album name is required').min(3, 'Album name must be at least 3 characters'),
  description: yup.string().max(500, 'Description cannot exceed 500 characters'),
});

export default albumValidationSchemas;

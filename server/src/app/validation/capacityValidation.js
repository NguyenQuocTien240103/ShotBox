import * as yup from "yup";

const capacityValidationSchemas = yup.object().shape({
  name: yup.string()
      .required('Name is required')
      .min(3, 'Album name must be at least 3 characters'),
  size: yup.number()
      .typeError('Size must be a number')
      .required('Size is required')
      .positive('Size must be greater than 0')
      .integer('Size must be an integer'),
  description: yup.string()
      .required('Description is required')
      .max(500, 'Description cannot exceed 500 characters'),
  price: yup.number()
      .typeError('Price must be a number')
      .required('Price is required')
      .positive('Price must be greater than 0')
});

export default capacityValidationSchemas;

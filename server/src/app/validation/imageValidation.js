import * as yup from "yup";

const imageValidationSchemas = {
  postImages: yup.object().shape({
    url: yup.string().url().required("Image URL is required."),
  }),
};

export default imageValidationSchemas;

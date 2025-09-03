const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            await schema.validate(data, { abortEarly: false });
            next();
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ errors: error.errors });
            }
            next(error);
        }
    };
};

export default validate;
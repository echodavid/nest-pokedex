
import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
    
    MONGODB: Joi.required(),
    DEFAULT_LIMIT : Joi.number().default(10),
    PORT: Joi.number().default(3005),
})
import * as Dotenv from 'dotenv';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

const dotEnvSchema = Yup.object().shape({
  IS_TS_NODE: Yup.string().oneOf(['true', 'false']),
  NODE_ENV: Yup.string().oneOf(['development', 'production']).required(),
  PORT: Yup.number(),
});

/**
 * Checks if all needed environment variables exist
 */
export const validateEnvs = (): Dotenv.DotenvParseOutput => {
  if (process.env.NODE_ENV !== 'production') {
    Dotenv.config();
  }

  dotEnvSchema.validate(process.env).catch((error: ValidationError) => {
    throw error;
  });

  return process.env;
};

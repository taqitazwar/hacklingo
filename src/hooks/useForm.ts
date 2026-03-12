import { useState, useCallback } from 'react';

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type Validator = (values: FormValues) => FormErrors;

interface UseFormOptions {
  initialValues: FormValues;
  validate?: Validator;
  onSubmit: (values: FormValues) => void | Promise<void>;
}

export function useForm({ initialValues, validate, onSubmit }: UseFormOptions) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setValue = useCallback((field: string, value: string) => {
    setValues(v => ({ ...v, [field]: value }));
  }, []);

  const setFieldTouched = useCallback((field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
  }, []);

  const handleSubmit = async () => {
    const validationErrors = validate?.(values) ?? {};
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, submitting, setValue, setFieldTouched, handleSubmit, reset };
}

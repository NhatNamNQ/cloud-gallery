import { useState, useCallback } from 'react'

/**
 * Generic form state management hook
 * Provides form value tracking, validation, and submission handling
 * Works well with react-hook-form or standalone
 */

interface FormState {
  [key: string]: string | number | boolean | File | null
}

export interface UseFormReturn<T extends FormState = FormState> {
  values: T
  errors: Record<keyof T, string | undefined>
  touched: Record<keyof T, boolean>
  isSubmitting: boolean
  isDirty: boolean
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: keyof T, error: string | undefined) => void
  setFieldTouched: (field: keyof T, touched?: boolean) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  resetForm: () => void
  setSubmitting: (submitting: boolean) => void
  setValues: (values: Partial<T>) => void
  setErrors: (errors: Record<keyof T, string | undefined>) => void
}

/**
 * Generic form hook for managing form state
 * @param initialValues Initial form values
 * @returns Form state and handlers
 */
export function useForm<T extends FormState = FormState>(initialValues: T): UseFormReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrorsState] = useState<Record<keyof T, string | undefined>>(
    {} as Record<keyof T, string | undefined>
  )
  const [touched, setTouchedState] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)
  const [isSubmitting, setSubmittingState] = useState(false)
  const [initialValuesCopy] = useState(initialValues)

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValuesCopy)

  /**
   * Set a single field value
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValuesState((prev) => ({
      ...prev,
      [field]: value
    }))
  }, [])

  /**
   * Set a single field error
   */
  const setFieldError = useCallback((field: keyof T, error: string | undefined) => {
    setErrorsState((prev) => ({
      ...prev,
      [field]: error
    }))
  }, [])

  /**
   * Mark a field as touched
   */
  const setFieldTouched = useCallback((field: keyof T, touched: boolean = true) => {
    setTouchedState((prev) => ({
      ...prev,
      [field]: touched
    }))
  }, [])

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement

      if (type === 'file') {
        setFieldValue(name as keyof T, (e.target as HTMLInputElement).files?.[0] || null)
      } else if (type === 'checkbox') {
        setFieldValue(name as keyof T, (e.target as HTMLInputElement).checked)
      } else if (type === 'number') {
        setFieldValue(name as keyof T, value ? Number(value) : '')
      } else {
        setFieldValue(name as keyof T, value)
      }
    },
    [setFieldValue]
  )

  /**
   * Handle input blur (mark as touched)
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target
      setFieldTouched(name as keyof T, true)
    },
    [setFieldTouched]
  )

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValuesState(initialValuesCopy)
    setErrorsState({} as Record<keyof T, string | undefined>)
    setTouchedState({} as Record<keyof T, boolean>)
    setSubmittingState(false)
  }, [initialValuesCopy])

  /**
   * Set submitting state
   */
  const setSubmitting = useCallback((submitting: boolean) => {
    setSubmittingState(submitting)
  }, [])

  /**
   * Set all values at once
   */
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({
      ...prev,
      ...newValues
    }))
  }, [])

  /**
   * Set all errors at once
   */
  const setErrors = useCallback((newErrors: Record<keyof T, string | undefined>) => {
    setErrorsState(newErrors)
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    resetForm,
    setSubmitting,
    setValues,
    setErrors
  }
}

export default useForm

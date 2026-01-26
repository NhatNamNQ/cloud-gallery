import { useState, useCallback, useEffect } from 'react'

/**
 * Hook for managing persistent state with localStorage
 * Automatically syncs state with localStorage
 */

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Create state variable to track rendered value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get value from localStorage by key
      const item = window.localStorage.getItem(key)

      if (item) {
        // Parse stored value if it exists
        return JSON.parse(item)
      }

      // Return initial value if nothing in localStorage
      return initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Return a wrapped version of useState's setter function that
   * persists the new value to localStorage
   */
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // Save state
        setStoredValue(valueToStore)

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error writing to localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  /**
   * Remove the item from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  /**
   * Listen for changes in other windows/tabs
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue, removeValue] as const
}

export default useLocalStorage

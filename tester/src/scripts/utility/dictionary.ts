/** Dictionary interface */
export interface IDictionary {
  /** Key from the dictionary
   */
  key: string
  /** Value for that dictionary key
   */
  value: string
}

/** Here we are extending the Window interface to include the Umbraco dictionary thats rendered as a script tag. */
export interface IWindowExtensionDictionary extends Window {
  /** The dictionary object that the Window interface is being extended with */
  dictionary: IDictionary[]
}
// Here we are extending the Window interface with the dictionary interface.
declare let window: IWindowExtensionDictionary

/**
 * @description Dictionary function that returns the value of the dictionary key
 * @param  {string} key
 * @description Returns the value of the key from the Umbraco dictionary (that is rendered as a script tag in the markup).
 * @example dictionary('Key')
 */
export function dictionary(key: string): string {
  const getDictionary = window.dictionary
  let returnedValue

  if (getDictionary) {
    for (const [dictKey, value] of Object.entries(getDictionary)) {
      if (dictKey === key) {
        returnedValue = value
      }
    }

    return returnedValue
  }

  return '[Dictionary key not found]'
}

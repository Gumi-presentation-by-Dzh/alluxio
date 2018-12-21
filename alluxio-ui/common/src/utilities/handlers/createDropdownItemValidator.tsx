import React from 'react';

export type FieldValidatorFunctionType = (name: string, value: string) => string;
export type FieldValidatorFunctionsType = FieldValidatorFunctionType[];

export const createDropdownItemValidator = (elementId: string, elementName: string, fieldValidatorFunctions: FieldValidatorFunctionsType) => (
  function (this: any, event: React.FormEvent<HTMLInputElement>, isFormSubmission: boolean = false) {
    const element = document.getElementById(elementId);
    const elementValue = element && element.getAttribute('value') || '';
    let errors: string[] = [];
    if (isFormSubmission) {
      errors = fieldValidatorFunctions.map((validator: FieldValidatorFunctionType) => validator(elementName, elementValue)).filter((value: string) => value !== '');
    }
    this.setState((prevState: any) => {
      if (errors.length) {
        return {validationErrors: {...prevState.validationErrors, ...{[elementId]: errors}}};
      }

      const newState = {...prevState};
      delete newState.validationErrors[elementId];
      return newState;
    });
  }
);
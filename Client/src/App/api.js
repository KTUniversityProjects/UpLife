export const apiUrl = "http://localhost:4000/";

export const requestReponses = {
  /* EXAMPLE */
  //General
  REQUEST_ERROR: 100,
  CODE_ERROR_SQL: 102,
  WRONG_SESSION: 105,
  NO_PERMISSION: 106,
  CODE_ERROR_INSERTING_OBJECT: 107,

  //Success
  SUCCESS: 200
};

export const responseTexts = {
  [requestReponses.EMPTY_FIELDS]: "Užpildykite visus laukus",
  [requestReponses.REQUEST_ERROR]: "Bloga užklausos informacija",
  [requestReponses.CODE_ERROR_SQL]: "Įvyko klaida duomenų bazėje."
};

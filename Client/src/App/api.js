export const apiUrl = "http://localhost:8300/";

export const requestReponses = {
  /* EXAMPLE */
  //General
  REQUEST_ERROR: 100,
  CODE_ERROR_SQL: 102,
  WRONG_SESSION: 105,
  NO_PERMISSION: 106,
  CODE_ERROR_INSERTING_OBJECT: 107,

  //Validation
  CODE_WRONG_LOGIN_DATA: 103,
  EMPTY_FIELDS: 104,

  //Parking
  CODE_ERROR_NEGATIVE_SPACES_COUNT: 300,
  CODE_ERROR_NEGATIVE_HOURLY_RATE: 301,
  CODE_ERROR_END_DATE_BEFORE_START_DATE: 302,
  CODE_ERROR_ZONE_DOES_NOT_EXISTS: 303,

  //Airport

  //Airlines
  CORE_ERROR_MORE_THAN_MAX_SEATS: 305,
  //Employees

  //Success
  SUCCESS: 200
};

export const responseTexts = {
  [requestReponses.EMPTY_FIELDS]: "Užpildykite visus laukus",
  [requestReponses.REQUEST_ERROR]: "Bloga užklausos informacija",
  [requestReponses.CODE_ERROR_SQL]: "Įvyko klaida duomenų bazėje.",
  [requestReponses.CODE_ERROR_INSERTING_OBJECT]:
    "Duomenų bazės klaida. Galimai dubliuotas vardas.",
  [requestReponses.CODE_WRONG_LOGIN_DATA]:
    "El. pašto adresas arba slaptažodis yra neteisingi",
  [requestReponses.CORE_ERROR_MORE_THAN_MAX_SEATS]:
    "Įvestas bendras vietų skaičius viršija vietų skaičių lėktuve",
  //Parking
  [requestReponses.CODE_ERROR_NEGATIVE_SPACES_COUNT]:
    "Vietų skaičius negali būti neigiamas",
  [requestReponses.CODE_ERROR_NEGATIVE_HOURLY_RATE]:
    "Valandinis įkainis negali būti neigiamas",
  [requestReponses.CODE_ERROR_END_DATE_BEFORE_START_DATE]:
    "Pabaigos data turi būti vėlesnė už pradžio datą",
  [requestReponses.CODE_ERROR_ZONE_DOES_NOT_EXISTS]:
    "Pasirinkta parkavimo zona nebeegzistuoja"
};

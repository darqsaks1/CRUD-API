type THttp = {
  OK: number,
  CREATED: number,
  BAD_RESPONSE: number,
  NOT_FOUND: number,
  SERVER_ERROR: number,
  DELETED: number,
}

export const HTTP_STATUS: THttp = {
  OK: 200,
  CREATED: 201,
  BAD_RESPONSE: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  DELETED: 204,
};
export const HEAD_CONTENT = { 'Content-Type': 'application/json' };

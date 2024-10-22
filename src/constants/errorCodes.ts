// errorCodes.ts
interface ErrorCode {
    httpStatus: number;
    message: string;
}

const commonErrorCodes: Record<string, ErrorCode> = {
  'ERR-001': { httpStatus: 400, message: 'Missing data in request' },
  'ERR-002': { httpStatus: 400, message: 'Invalid header' },
  'ERR-003': { httpStatus: 401, message: 'Unauthorised, Please login again' },
  'ERR-004': { httpStatus: 500, message: 'Server Error. Please try later' },
  'ERR-005': { httpStatus: 500, message: 'Invalid token' },
};

const errorCodes: Record<string, ErrorCode> = {
  ...commonErrorCodes,
};
export default errorCodes;
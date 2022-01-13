import { Logger } from 'simple-logging-system';
import { forbiddenError, HttpPlumeResponse, makeErrorPromiseResponse } from './PlumeHttpResponse';
import { FetchResponseHandler } from './FetchClient';

const logger = new Logger('FetchStatusValidators');

const validateBasicStatusCodes: FetchResponseHandler = (response: Response) => {
  // if the error is a forbidden access, the body should be empty
  if (response.status === 403) {
    logger.warn('Forbidden access', response);
    return makeErrorPromiseResponse(forbiddenError);
  }

  // if there is no content, there is no need to try to parse it
  if (response.status === 204) {
    return Promise.resolve<HttpPlumeResponse<unknown>>({ response: null as unknown });
  }

  return undefined;
};

export default validateBasicStatusCodes;
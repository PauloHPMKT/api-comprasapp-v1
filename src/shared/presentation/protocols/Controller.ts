import { HttpRequest } from '../http/request';
import { HttpResponse } from '../http/response';

export abstract class BaseController<Request = any, Response = any> {
  abstract handle(
    request: HttpRequest<Request>,
  ): Promise<HttpResponse<Response>>;

  protected validateRequiredFields(
    payload: Request,
    requiredFields: string[],
  ): string | null {
    for (const field of requiredFields) {
      if (!payload[field]) return field;
    }
    return null;
  }
}

import { HttpRequest } from '../http/request';
import { HttpResponse } from '../http/response';

export abstract class BaseController<Request = any, Response = any> {
  abstract handle(
    request: HttpRequest<Request>,
  ): Promise<HttpResponse<Response>>;
}

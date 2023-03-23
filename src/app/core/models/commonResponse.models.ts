export interface CommonResponse<T = {}> {
  resultCode: number;
  messages: string[];
  data: T;
  fieldsErrors: string[];
}

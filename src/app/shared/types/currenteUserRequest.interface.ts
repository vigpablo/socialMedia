import { CurrentUserInterface } from "./currentUserInterface";

export interface CurrentUserRequestInterface {
  user: CurrentUserInterface & {password: string}
}

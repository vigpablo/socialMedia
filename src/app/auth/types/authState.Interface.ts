import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface"
import { CurrentUserInterface } from "src/app/shared/types/currentUserInterface"

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  isLoading: boolean
  validationErrors: BackendErrorsInterface | null
}

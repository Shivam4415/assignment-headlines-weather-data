enum Message {
  RequestForbidden = "Fobidden.",

  Unauthorized = "Unauthorised",

  InvalidRequest = "Invalid Request.",

  InvalidRequestParam = "Invalid Request Parameters.",

  InternalServerError = "Internal Server Error. Please contact support if you encounter this error continuously.",

  NotFound = "Resource Not Found.",

  DuplicateName = "%s with name %s already exists. You cannot create %s with duplicate name.",

  TimeOut = "Timeout. Please try again.",

  WrongHashValue = "Wrong hash value.",

  UserAlreadyRegistered = "User Already Registered.",
}
export default Message;

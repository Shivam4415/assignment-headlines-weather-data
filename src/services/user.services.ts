import { User } from "src/entities/user";
import Message from "src/messages";
import { getManager } from "typeorm";

export class UserServices {
  public static async isUserExists(email: string) {
    try {
      const userByEmail = await User.findOne({ email });
      if (!userByEmail) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
  public static async Register(
    uname: string,
    uemail: string,
    upassword: string
  ) {
    try {
      const agreementId = 1;
      const isUserRegistered = await this.isUserExists(uemail);
      if (isUserRegistered) {
        throw new Error(Message.UserAlreadyRegistered);
      }
      const user = await getManager().query(
        "select * from create_users(" +
          "'" +
          uname +
          "'" +
          ", " +
          "'" +
          uemail +
          "'" +
          "," +
          "'" +
          upassword +
          "'" +
          ")"
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

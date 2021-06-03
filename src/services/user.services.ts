import { AccessTokens } from "src/entities/accessTokens";
import { User } from "src/entities/user";
import Message from "src/messages";
import { getManager } from "typeorm";
import KSUID from "ksuid";

export class UserServices {
  public static async isUserExists(email: string) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  public static async getByEmail(
    email: string,
    fetchAccessToken: boolean = false
  ) {
    const relations = [];
    if (fetchAccessToken) {
      relations.push("accessTokens");
    }
    return User.findOne({
      relations: relations,
      where: { email },
    });
  }
  public static async Register(
    uname: string,
    uemail: string,
    upassword: string
  ) {
    try {
      const userObj = await User.findOne({ email: uemail });
      if (userObj && userObj.email === uemail) {
        throw new Error(Message.UserAlreadyRegistered);
      }
      const user = new User();
      user.name = uname;
      user.email = uemail;
      user.password = upassword;
      user.hasApiAccess = false;
      return user.save();
    } catch (error) {
      console.log(error);
    }
  }

  public static async createAccessToken(
    name: string,
    description: string,
    userId: string
  ) {
    try {
      const accessTokens = await AccessTokens.findOne({
        where: { userId: userId, name: name },
      });

      if (accessTokens) {
        throw new Error("Cannot create access token with duplicate name");
      }

      const accessToken = await AccessTokens.create({
        name: name,
        description: description || "",
        userId: userId,
        accessToken: KSUID.randomSync().string,
      }).save();
      return accessToken.accessToken;
    } catch (er) {
      throw er;
    }
  }

  public static async getAccessTokens(userId: string): Promise<AccessTokens[]> {
    try {
      return await AccessTokens.find({
        where: { userId: userId },
      });
    } catch (er) {
      throw er;
    }
  }

  public static async setApiAccess(email: string) {
    try {
      const userObj = await User.findOne({ email });
      if (!userObj) {
        throw new Error(Message.NotFound);
      }
      userObj.hasApiAccess = true;
      return await userObj.save();
    } catch (er) {
      throw er;
    }
  }
}

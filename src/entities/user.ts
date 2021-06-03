import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { AccessTokens } from "./accessTokens";

@Entity("api_users")
export class User extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @OneToMany((type) => AccessTokens, (accessTokens) => accessTokens.user)
  public accessTokens: AccessTokens[];

  @Column()
  public hasApiAccess: boolean;
}

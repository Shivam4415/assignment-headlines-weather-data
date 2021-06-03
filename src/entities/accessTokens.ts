import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity("access_tokens")
export class AccessTokens extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @PrimaryColumn()
  public accessToken: string;

  @ManyToOne((type) => User, (user) => user.accessTokens)
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id",
  })
  public user: User;

  @Column()
  public userId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

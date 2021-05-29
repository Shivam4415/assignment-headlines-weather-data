import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

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
}

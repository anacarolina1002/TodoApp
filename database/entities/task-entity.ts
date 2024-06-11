import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity()
export class Task extends BaseEntity{
  @Column('varchar')
    title: string;

  @Column('boolean')
    completed!: boolean;
}

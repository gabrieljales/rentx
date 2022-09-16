import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column({ default: true })
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  // Tabelas de relacionamentos -> ManyToMany
  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }], // Coluna da tabela que pertence a essa classe
    inverseJoinColumns: [{ name: "specification_id" }], // A outra coluna
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };



/**
 * Entity interface holds the common property of interfaces that have corresponding data in a database table.
 * This is to reduce boilerplate when creating new interface.
 */
export default interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
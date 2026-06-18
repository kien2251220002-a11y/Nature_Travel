/**
 * Tour Model Fields definition
 * 
 * Column types in SQLite:
 * - id: INTEGER PRIMARY KEY AUTOINCREMENT
 * - name: TEXT NOT NULL
 * - location: TEXT NOT NULL
 * - duration: TEXT NOT NULL
 * - price: REAL NOT NULL
 * - image: TEXT NOT NULL
 * - rating: REAL DEFAULT 5.0
 * - description: TEXT NOT NULL
 */

export class Tour {
  constructor({ id, name, location, duration, price, image, rating, description }) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.duration = duration;
    this.price = price;
    this.image = image;
    this.rating = rating;
    this.description = description;
  }
}

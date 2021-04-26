const db = require('../../config/db');

module.exports = {
  async create(data) {
    try {
      const query = `
        INSERT INTO places (
            name,
            image_url,
            address,
            complement,
            state,
            city,
            items
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `;
      const values = [
        data.name,
        data.image_url,
        data.address,
        data.complement,
        data.state,
        data.city,
        data.items,
      ];

      await db.query(query, values);
    } catch (err) {
      console.error(err);
    }
  },
  async search(term) {
    try {
      const query = `
        SELECT * 
        FROM places 
        WHERE city ILIKE '%${term}%'
        OR state ILIKE '%${term}%'
      `;

      const results = await db.query(query);

      return results.rows;
    } catch (err) {
      console.error(err);
    }
  },
};

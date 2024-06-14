const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
const pass = 'tempTestingPassword';
const hash = bcrypt.hashSync(pass, salt);
console.log(salt);
console.log(salt.length);
console.log(pass);
console.log(hash);
console.log(hash.length);
console.log(bcrypt.compareSync(pass, hash));

admin acc details:
+------------+-----------+--------------+--------------------------------------------------------------+-----------+------------------+------------+
| first_name | last_name | phone_number | password                                                     | user_type | email_id         | address_id |
+------------+-----------+--------------+--------------------------------------------------------------+-----------+------------------+------------+
| Temp       | Admin     | NULL         | $2b$10$de85wTQnLdk.Y3rXLjP.BOGpXC0pVMSQmRgqBceFzVYKPW0xNo9cS | admin     | temp@testing.com |          1 |
+------------+-----------+--------------+--------------------------------------------------------------+-----------+------------------+------------+
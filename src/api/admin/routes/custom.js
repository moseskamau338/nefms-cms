module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/create-author',
      handler: async (ctx) => {
        console.log('Hello world')
        try {
          const { firstname, lastname, email, password } = ctx.request.body;
          if (!firstname || !lastname || !email || !password) {
            // ctx.badRequest(message, details)
            return ctx.badRequest(`firstname, lastname, email and password are required fields`);
          }

          const user = await strapi.db.query("admin::user").findOne({ where: { email: email } });
          if (user) {
            strapi.log.error(`Couldn't create author: ${email} already exists`);
            return ctx.badRequest(`${email} already exists`)
          }

          const hashedPassword = await strapi.service("admin::auth").hashPassword(password);
          const authorRole = await strapi.db.query("admin::role").findOne({ where: { code: 'strapi-author' } })
          const adminUserData = {
            firstname,
            lastname,
            email,
            password: hashedPassword,
            roles: [authorRole],
            blocked: false,
            isActive: true,
          }

          const response = await strapi.db.query("admin::user").create({ data: { ...adminUserData } });

          strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
          return ctx.send({ message: 'Author created successfully!', details: response }, 200);
        } catch (err) {
          return ctx.internalServerError(err.message)
        }
      },
      config: {
       auth: false
      }
    }
  ]
}

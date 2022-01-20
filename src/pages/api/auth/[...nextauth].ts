// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        displayId: { label: 'ユーザーID', type: 'text', placeholder: 'jsmith' },
        password: { label: 'パスワード', type: 'password' },
      },
      authorize: async (credentials, _req) => {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('http://192.168.99.101/account/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        // 例
        // user = {
        //   name: 'name',
        //   email: 'email',
        //   image: 'image',
        // };
        // これは
        // const [session] = useSession()
        // session.user で取り出せる

        // If no error and we have user data, return it
        if (res.ok && user) {
          // return user;
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
});

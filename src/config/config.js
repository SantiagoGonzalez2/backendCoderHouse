import dotenv from 'dotenv'


dotenv.config()

export default  {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    email: process.env.EMAIL,
    pass : process.env.PASS,
    passAdmin : process.env.ADMINPASS
}
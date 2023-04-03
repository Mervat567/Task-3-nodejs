const request=require("supertest")
const app=require("../../config/app")
const mongoDB=require("../../config/database")


describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing User App",()=>{

        describe("GET /getAllUsers",()=>{
           test("should read all users",async()=>{
            const response=await request(app).get('/getAllUsers')
            expect(response.body.code).toBe(200)
           })
        })


        describe("POST /login",()=>{

            let data={
                "email" : "hisham@gmail.com",
                "password" : "mghd56"
            }
            test("should sign in an user",async()=>{
             const response=await request(app).post('/login').send(data)
             expect(response.body.code).toBe(201)
            })
            test("should return 404 user not found",async()=>{
                const response=await request(app).post('/login')
                .send({
                    "email" : "alimohammed@gmail.com",
                    "password" : "mghd56"
                })
                expect(response.body.code).toBe(404)
               })
               test("should return 400 incorrect password",async()=>{
                const response=await request(app).post('/login')
                .send({
                    "email" : "hisham@gmail.com",
                    "password" : "mgh45678"
                })
                expect(response.body.message).toBe("incorrect password")
               })
         })
        

    
         describe("PUT /updateUser/:id",()=>{
        let data={
            "firstName" : "mohammed",
             "lastName" : "ali",
        }
        test("should update user",async()=>{
         const response=await request(app)
         .put('/updateUser/63ea5558e3a5f1df7251b20a')
         .send(data)
         expect(response.body.code).toBe(201)
        })
     })


     describe("DELETE /deleteUser/:id",()=>{
        test("should delete user",async()=>{
         const response=await request(app)
         .delete('/deleteUser/63ea550c43e81e962ebf56a9')
         expect(response.body.message).toBe("success")
        })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})


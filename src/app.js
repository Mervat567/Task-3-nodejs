    const express = require('express')
    const app = express()
    var hbs = require ('hbs')

    const port = process.env.PORT || 3000

    
    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')
    app.use (express.static (publicDirectory))


    app.set('view engine', 'hbs');
    const viewsDirectory = path.join (__dirname , "../templates/views" )
    app.set( "views" , viewsDirectory)

    
      const partialsPath = path.join (__dirname , "../templates/partials")
      hbs.registerPartials(partialsPath)


    app.get('/' , (req , res) => {
        res.render('index' , {
            title: "HOME",
            name : "Mervat",
            img1 : "images/course-1.jpg"

        })
    })


    app.get('/about' , (req , res) => {
        res.render('about' , {
            title : "ABOUT",
            name : "Haneen",
            img2 : "images/trainer-2.jpg"
        })
    })


    app.get('/services' , (req , res) => {
        res.render('services' , {
            title : "SERVICES",
            name:"Ahmed",
            img3 : "images/trainer-3.jpg"
        })
    })

    app.get('/contact' , (req , res) => {
        res.render('contact' , {
            title : "CONTACT",
            name: "Ali",
           phone:"01234566778",
           whats:"01056478899",
        })
    })


    app.get('/help' , (req , res) => {
        res.render('help' , {
            title:"HELP",
           help:"How Can We Help You?",
           name:"Mohammed"
        })
    })



    app.listen(port, () => {
    console.log(`server is listening  on port ${port}`)
    })
    


  

const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const pug = require('pug')
const mongoose = require('mongoose')
const http = require('http')
const bodyparser = require('body-parser')
const multer = require('multer')



app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, '/')))
app.use(express.json({ limit: '10gb' }))


// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/'))

const DataBaseName = 'BlogSite'
const CollectionName1 = 'Autosaves'

mongoose.connect(`mongodb+srv://Lakshya:skinky@13122005@blogsite.sii4x.mongodb.net/${DataBaseName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const db = mongoose.connection
db.once('open', () => {
    console.dir('THE DATABASE IS SUCCESSFULLY CONNECTED')
})

const Schema1 = new mongoose.Schema({
    Title: String,
    Content: String,
})

const Schema2 = new mongoose.Schema({
    Title: String,
    Content: String,
    Tag1: String,
    Tag2: String,
    Tag3: String,
    Tag4: String,
    Tag5: String,
    Tag6: String,
    Thumbnail: String,
    URL: String,
    Comment: Array,

})

const Schema3 = new mongoose.Schema({
    Image: String
})
const Schema4 = new mongoose.Schema({
    Video: String
})


const autosave = mongoose.model(CollectionName1, Schema1)
const finalsave = mongoose.model('finalsaves', Schema2)
const imagesave = mongoose.model('images', Schema3)
const videosave = mongoose.model('videos', Schema4)

const ImagesStorage = multer.diskStorage({
    destination: './imagestorage',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
const VideoStorage = multer.diskStorage({
    destination: './videostorage',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const ThumbnailStorage = multer.diskStorage({
    destination: './thumbnailstorage',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const imageupload = multer({
    storage: ImagesStorage
}).single('LocalImage')
const videoupload = multer({
    storage: VideoStorage
}).single('LocalVideo')
const thumbnailupload = multer({
    storage: ThumbnailStorage
}).single('Thumbnail')


//___________________________________________________________________________________________

app.listen(80 || process.env.PORT , () => {
    console.log('THE PORT IS UP AND RUNNING')
    console.dir(`http://localhost/`)
})

app.get('/', (req, res) => {
    res.sendFile('home/home.html', { root: __dirname })
})

app.get('/articles', (req, res) => {

    finalsave.find({}, (err, CollectionName) => {
        // for (let article = 1; article < CollectionName.length + 1; article++) {
        //     console.log(article)
        //     console.log(CollectionName[article - 1])
        // }
        res.render('./articles/articles.ejs', {
            data: CollectionName.reverse(),
        })
        // ejsLint(text, options)
    })




})
app.get('/create', (req, res) => {

    autosave.find({}, (err, CollectionName) => {
        const latestdata = CollectionName[CollectionName.length - 1]
        imagesave.find({}, (err1, CollectionName1) => {
            const Image = CollectionName1[CollectionName1.length - 1].Image
            videosave.find({}, (err2, CollectionName2) => {
                const Video = CollectionName2[CollectionName2.length - 1].Video
                res.render('create/create.ejs', {
                    Title: latestdata.Title,
                    Content: latestdata.Content,
                    Image: Image,
                    Video: Video
                })
            })
        })
    })
})

app.get('/about', (req, res) => {

    res.sendFile('about/about.html', { root: __dirname })


})


app.post('/send', (req, res) => {

    autosave.find({}, (err, CollectionName) => {
        const latestid = CollectionName[CollectionName.length - 1].id
        const autosaved = autosave.updateOne({ _id: latestid }, {
            $set: {
                Title: String(req.body.Title),
                Content: String(req.body.Content),
            }
        }, function (err, data) {
            return data
        })

        autosaved.update()
    })
    res.end()
})


app.post('/upload', (req, res) => {

    console.log('THIS IS THE UPLOAD')
    console.log('')
    // console.log(req.body)

    autosave.find({}, (err, CollectionName) => {

        const latestdata = CollectionName[CollectionName.length - 1]
        console.log(latestdata)
        res.render('confirmation/confirmation.ejs', {
            Title: latestdata.Title,
            Content: latestdata.Content,
        })
    })
})

app.post('/options', thumbnailupload, (req, res) => {


    const Thumbnail = req.file.filename
    console.log(Thumbnail)

    autosave.find({}, (err, CollectionName) => {
        const Title = CollectionName[CollectionName.length - 1].Title
        const Content = CollectionName[CollectionName.length - 1].Content
        let Labels = {
            Label1: req.body.Label1,
            Label2: req.body.Label2,
            Label3: req.body.Label3,
            Label4: req.body.Label4,
            Label5: req.body.Label5,
            Label6: req.body.Label6,
        }

        const URL = Title.replace(/\s+/g, '');

        const finaldata = new finalsave({
            Title: Title,
            Content: Content,
            Tag1: Labels.Label1,
            Tag2: Labels.Label2,
            Tag3: Labels.Label3,
            Tag4: Labels.Label4,
            Tag5: Labels.Label5,
            Tag6: Labels.Label6,
            Thumbnail: Thumbnail,
            URL: URL,
        })

        finaldata.save()

        res.redirect('/articles')

        console.log(finaldata)
    })

    const blankObj = new autosave({
        Title: "",
        Content: "",
    })

    blankObj.save()


})


app.post('/comment', (req, res) => {

    console.log(req.body.content)
    console.log(req.body.id)

    finalsave.find({}, (err, CollectionName) => {
        console.log(req.body.id)
        let commentfinalsave = finalsave.updateOne({ _id: req.body.id },
            {
                $push: { Comment: [req.body.content] }
            }, function (err, data) {
                return data
            })

        commentfinalsave.update()

    })

})

app.post('/imageupload', imageupload, (req, res) => {

    //  console.log(req.body) 
    console.log('uploaded')

    const imagename = req.file.filename

    let image = new imagesave({
        Image: imagename,
    })
    image.save()
    res.redirect('/')
})




app.post('/videoupload', videoupload, (req, res) => {

    console.log(req.file.filename)

    const video = new videosave({
        Video: req.file.filename
    })
    video.save()
    res.redirect('/')


})

app.use((req, res) => {
    res.sendFile('404/404.html', { root: __dirname })
    res.statusCode = 404

    // this is a 404 page which processes if any argument that is coded above this part does not run. if it runs, the respective function would be performed and if doesn't this would be carried out
})


// const blankObj = new autosave({
//     Title: "",
//     Content: "",
// })

// blankObj.save()

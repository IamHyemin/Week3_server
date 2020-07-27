// app.js
// user 데이터를 조회·수정·삭제 하는 간단한 RESTful 웹서버
// 파일은 FileSystem에 저장하고, file 목록은 DB에 저장한다.

// [LOAD PACKAGES]
let express = require('express'); // express 넷 프레임워크 불러오기
let app = express(); // 변수 app에 프레임워크 할당
let bodyParser = require('body-parser');
let mongoose = require('mongoose') // mongoDB를 유연하게 활용할 수 있게 해주는 모듈
let multer = require('multer'); // 파일 업로드를 위한 모듈

let storage = multer.diskStorage( {
  // 경로 설정
  destination : function(req, file, cb) {
    // 업로드된 파일은 images 폴더에 저장된다
    cb(null, './images/');
  },

  //실제 저장되는 파일명 설정
  filename : function(req, file, cb) {

    //Multer는 어떠한 파일 확장자도 추가하지 않습니다.
    //사용자 함수는 파일 확장자를 온전히 포함한 파일명을 반환해야 합니다.
    let mimeType;
    const filename = file.originalname;

    switch (file.mimetype) {
      case "image/jpeg":
        mimeType = "jpg";
        break;
      case "image/png":
        mimeType = "png";
        break;
      case "image/gif":
        mimeType = "gif";
        break;
      case "image/bmp":
        mimeType = "bmp";
        break;
      default:
        mimeType = "jpg";
        break;
    }

    cb(null, filename.substring(0, filename.lastIndexOf(".")) + "_" + Date.now() + "." + mimeType);
  }
})

let upload = multer({storage: storage});


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
let port = process.env.PORT || 6060; // process.env.PORT가 0이면 7980

// [CONFIGURE mongoose]

// CONNECT TO MONGODB server
mongoose.connect('mongodb://localhost/week3');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongodb server");
});

// DEFINE MODEL
let User = require('./models/user');
let Image = require('./models/image');

// [CONFIGURE ROUTER]
let router = require('./routes')(app, User, Image, upload);

// [RUN SERVER]
let server = app.listen(port, function() {
  console.log("Express server has started on " + server.address().address + ':' + port);
});

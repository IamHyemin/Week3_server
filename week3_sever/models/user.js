// models/user.js
// User의 schema 정의

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  id : String,
  password: String,
  photo_list : {type: Array, default:[]}
});


userSchema.index( {id : 1} ); // email과 name은 빨리 검색할 수 있도록 mongoDB index를 생성함.

userSchema.methods.comparePassword = function(pw, callback) {
  if ((this.password !== pw)) {
    callback('password 불일치');
  } else {
    callback(null, true);
  }
};

// 새로운 데이터를 Create 하고 저장할 때 required한 요소가 전부 있는지 체크
userSchema.pre('save', function(next) {
  if(!this.id) {
    throw 'save() - 이메일이 누락되었습니다';
  }
  if(!this.name) {
    throw 'save() - 이름이 누락되었습니다';
  }
  if(!this.password) {
    throw 'save() - 비밀번호가 누락되었습니다';
  }
  next();
});

userSchema.set('toJson');

module.exports = mongoose.model('user', userSchema);
// models/image.js
// User가 업로드할 image의 schema 정의

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: { type: String, maxlength: 50, required: [true, '해당 이미지의 title이 누락되었습니다'] }, // 갤러리에서 보여줄 제목(파일명이 아님)
    saveFileName: { type: String, required: true}, // 실제로 저장될 이름
    size: String
})

imageSchema.set('toJson');

module.exports = mongoose.model('image', imageSchema);
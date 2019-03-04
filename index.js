
const AWS = require("aws-sdk");
const sharp = require('sharp');

var THUMBNAIL_KEY_PREFIX = "thumbnails/";
var ALLOWED_FILETYPES = ['png', 'jpg', 'jpeg', 'tiff', 'gif'];

var s3 = new AWS.S3();

exports.handler = async (event, context) => {
  
  if (!event.Records[0].s3){
    return;
  }

  console.log(event.Records[0].s3.bucket.name);
  console.log(event.Records[0].s3.object.key);
  
  let bucket = event.Records[0].s3.bucket.name;
  let srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " ")); 
  let dstKey = THUMBNAIL_KEY_PREFIX + srcKey.replace(/\.\w+$/, ".png");
  let fileType = srcKey.match(/\.\w+$/);

  console.log(bucket, srcKey, dstKey, fileType);

  if(srcKey.indexOf(THUMBNAIL_KEY_PREFIX) === 0) {
    return;
  }

  if (fileType === null) {
    console.error("Invalid filetype for key: " + srcKey);
    return;
  }

  fileType = fileType[0].substr(1);

  if (ALLOWED_FILETYPES.indexOf(fileType.toLowerCase()) === -1) {
    console.error("Invalid filetype: " + fileType);
    return;
  }

  let params = {Bucket: bucket, Key: srcKey};
  
  let response = await s3.getObject(params).promise();
 
  let buffer = await sharp(response.Body).resize(40).png().toBuffer();

  await s3.putObject({
                Bucket: bucket,
                Key: dstKey,
                Body: buffer,
                ContentType: "image/png",
              }).promise();
};


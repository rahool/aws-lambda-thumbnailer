# aws-lambda-thumbnailer
aws Lambda Function for creating thumbnails of images uploaded to a s3 bucket

Uses ![sharp image processing module](https://github.com/lovell/sharp) to resize images.

```
$ npm install
$ zip -r thumbnailer.zip index.js node_modules/ package.json package-lock.json
```

## Set up S3
Create a folder named 'thumbnails' in the bucket where you will be uploading images.
S3 bucket and the lambda function should be in the same region.

## Set up Lambda
1. Create a new Lambda from aws console
2. Goto Function code of the newly created Lambda and upload the thumbnailer.zip file

![Screenshot](docs/images/Screenshot2.png)

3. Create a new Role in IAM and attach AWSLambdaExecute policy

![Screenshot](docs/images/Screenshot1.png)

4. Select this role as your Lambda's Execution role

![Screenshot](docs/images/Screenshot4.png)

5. If the images are pretty large you can increase the timeout value in Lambda.

![Screenshot](docs/images/Screenshot3.png) 

## Event notification
In you S3 bucket properties, add an event notification to notify Lambda whenever some file is uploaded to your bucket.

![Screenshot](docs/images/Screenshot5.png)



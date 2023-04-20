const core = require('@actions/core');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

(async function run() {
  try {
    const endpoint = core.getInput('endpoint', { required: true });
    const accessKeyId = core.getInput('aws_access_key_id', { required: true });
    const secretAccessKey = core.getInput('aws_secret_access_key', { required: true });
    const bucket = core.getInput('bucket', { required: true });
    const expires = parseInt(core.getInput('expires', { required: false }));
    const filePath = core.getInput('file_path', { required: true });

    const client = new S3Client({
      forcePathStyle: false, // Configures to use subdomain/virtual calling format.
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const bucketParams = {
      Bucket: bucket,
      Key: filePath,
    };
    const url = await getSignedUrl(client, new GetObjectCommand(bucketParams), { expiresIn: expires });
    core.setOutput('url', url);
    core.setOutput('url_encoded', Buffer.from(url).toString('base64'));
  } catch (error) {
    core.setFailed(error.message);
  }
})();

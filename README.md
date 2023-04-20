# S3 Singed Url Action

Github Action for getting a signed url to access s3-compatible storage

## Inputs

### `endpoint`

**Required** endpoint to access s3-compatible storage

### `aws_access_key_id`

**Required** aws access key id

### `aws_secret_access_key`

**Required** aws secret access key

### `bucket`

**Required** bucket name

### `expires`

**Required** signed url expiration time in seconds

### `file_path`

**Required** path to the file in the bucket

## Outputs

### `url`

signed url

## Example usage

### Post content from static file

Let's assume the post markdown file is located at `./content/post.md`.
```yaml
name: get-signed-url
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: infraway/s3-signed-url-action@v1
        with:
          aws_access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          bucket: ${{ vars.AWS_BUCKET }}
          endpoint: ${{ vars.AWS_ENDPOINT }}
          expires: '86400'
          file_path: content/post.md
```

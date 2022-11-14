import json
import boto3

def lambda_handler(event, context):
    
    load=event["body"]
    client = boto3.client("s3")
    response = client.put_object(
    Body=bytes(load, encoding='utf-8'),
    Bucket='terraform-tfstatestore-api',
    Key='test/terraform.json',
)
    return {
        'statusCode': 200,
        'body':load
    }

from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from google.cloud import bigquery
from google.cloud.exceptions import NotFound
import pandas as pd
import os

# Configuration variables for Google Analytics and BigQuery
SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = 'isacaorg-1549988993890-6bb8f36a05c9.json'  # Path to your Google Cloud service account key file
VIEW_ID = '90975763'  # Your Google Analytics View ID
BIGQUERY_PROJECT = 'isacaorg-1549988993890'  # Your Google Cloud Project ID
BIGQUERY_DATASET = 'CMMI'  # BigQuery Dataset name where the data will be stored
BIGQUERY_TABLE = 'conversions_product'  # BigQuery Table name where the data will be stored, if it does not exist, it will be created

# Setting up the environment variable for Google Application Credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = KEY_FILE_LOCATION

def initialize_analyticsreporting():
    """Initializes the Google Analytics Reporting API client."""
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        KEY_FILE_LOCATION, SCOPES)
    analytics = build('analyticsreporting', 'v4', credentials=credentials)
    return analytics

def get_report(analytics, page_token=None):
    """Fetches the report data from Google Analytics."""
    # Here, specify the analytics report request details
    body = {
        'reportRequests': [
            {
              'viewId': VIEW_ID,
              'dateRanges': [{'startDate': '2020-01-01', 'endDate': '2024-06-26'}], 
            'metrics': [
                   {'expression': 'ga:itemQuantity'},
                   {'expression': 'ga:itemRevenue'}

              ],
  
            'dimensions': [
                    {'name': 'ga:campaign'},
                    {'name': 'ga:sourceMedium'},
                    {'name': 'ga:adContent'},
                    {'name': 'ga:keyword'},
                    {'name': 'ga:transactionId'},
                    {'name': 'ga:productCategoryHierarchy'},
                    {'name': 'ga:productName'},
                    {'name': 'ga:productSku'},
                    {'name': 'ga:date'}
                    
                ],
              'pageSize': 20000 # Adjust the pageSize as needed
            }
        ]
    }
    if page_token:
        body['reportRequests'][0]['pageToken'] = page_token

    return analytics.reports().batchGet(body=body).execute()

def response_to_dataframe(response):
    """Converts the API response into a pandas DataFrame."""
    list_rows = []
    for report in response.get('reports', []):
        columnHeader = report.get('columnHeader', {})
        dimensionHeaders = columnHeader.get('dimensions', [])
        metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])

        for row in report.get('data', {}).get('rows', []):
            dimensions = row.get('dimensions', [])
            dateRangeValues = row.get('metrics', [])

            row_data = {}
            for header, dimension in zip(dimensionHeaders, dimensions):
                row_data[header] = dimension

            for values in dateRangeValues:
                for metricHeader, value in zip(metricHeaders, values.get('values')):
                    row_data[metricHeader.get('name')] = value

            list_rows.append(row_data)

    return pd.DataFrame(list_rows)

def upload_to_bigquery(df, project_id, dataset_id, table_id):
    """Uploads the DataFrame to Google BigQuery."""
    # Rename columns from 'ga:' to ''
    df.columns = [col.replace('ga:', '') for col in df.columns]

    # Define data types
    
    
    df["ga:itemRevenue"] = pd.to_numeric(df["ga:itemRevenue"], errors='coerce')
    df["ga:itemQuantity"] = pd.to_numeric(df["ga:itemQuantity"], errors='coerce')
    df["ga:date"] = pd.to_datetime(df["ga:date"], errors='coerce')



    bigquery_client = bigquery.Client(project=project_id)
    dataset_ref = bigquery_client.dataset(dataset_id)
    table_ref = dataset_ref.table(table_id)
    schema = []

    # Define the schema of the table based on DataFrame columns
    for col in df.columns:
        # Choose BigQuery data type based on DataFrame column data type
        dtype = df[col].dtype
        print(col, dtype)
        if pd.api.types.is_integer_dtype(dtype):
            bq_type = 'INTEGER'
        elif pd.api.types.is_float_dtype(dtype):
            bq_type = 'FLOAT'
        elif pd.api.types.is_datetime64_dtype(dtype):
            bq_type = 'DATE'
        elif pd.api.types.is_bool_dtype(dtype):
            bq_type = 'BOOLEAN'
        else:
            bq_type = 'STRING'  # Default type

        schema.append(bigquery.SchemaField(col, bq_type))
    
    # Create a new table if it doesn't exist
    try:
        bigquery_client.get_table(table_ref)
    except NotFound:
        table = bigquery.Table(table_ref, schema=schema)
        bigquery_client.create_table(table)
        print(f"Created table {table_id}")

    # Upload data to BigQuery
    load_job = bigquery_client.load_table_from_dataframe(df, table_ref)
    load_job.result()
    print(f"Data uploaded")

def main():
    """Main function to execute the script."""
    try:
        page_token = None
        while True:
            # Fetching the report data from Google Analytics
            analytics = initialize_analyticsreporting()
            response = get_report(analytics, page_token)
            df = response_to_dataframe(response)
            print('\n',df,'\n')
            upload_to_bigquery(df, BIGQUERY_PROJECT, BIGQUERY_DATASET, BIGQUERY_TABLE)
            page_token = response.get('reports', [])[0].get('nextPageToken')
            if not page_token:
                break
            print(f"Fetching next page of results...{page_token}")
        
    except Exception as e:
        # Handling exceptions and printing error messages
        print(f"Error occurred: {e}")

if __name__ == '__main__':
    main()  # Entry point of the script
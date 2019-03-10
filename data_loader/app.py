from pymongo import MongoClient
import json
from bson import json_util


if __name__ == '__main__':
    client = MongoClient(host="localhost", port=27017)
    db = client.data
    collection = db.all_articles
    collection.drop()

    article_count = 0
    with open('News_Category_Dataset_v2.json', 'r') as f:
        for record in f.readlines():
            article_count += 1
            doc = json.loads(record)
            collection.insert_one(doc)
            if article_count % 2008 == 0:
                print(article_count)
    client.close()

from pymongo import MongoClient
import time
import random
import datetime


if __name__ == "__main__":
    client = MongoClient(host="localhost", port=27017)
    db = client.data
    article_collection = db.articles
    all_articles = db.all_articles
    article_collection.drop()

    cursor = all_articles.aggregate([{'$sample': {'size': all_articles.count()}}], allowDiskUse=True)
    for article in cursor:
        # wait for random number of seconds
        time.sleep(random.random())
        article['date'] = datetime.datetime.now()
        print(article)
        article_collection.insert_one(article)
    client.close()

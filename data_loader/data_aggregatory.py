from pymongo import MongoClient
import datetime

import signal


class GracefulKiller:
    db_connection = ...

    def __init__(self, db_connection: MongoClient):
        self.db_connection = db_connection
        signal.signal(signal.SIGINT, self.exit_gracefully)
        signal.signal(signal.SIGTERM, self.exit_gracefully)

    def exit_gracefully(self, signum, frame):
        self.db_connection.close()
        print("connection closed")


if __name__ == "__main__":
    client = MongoClient(host="localhost", port=27017)
    killer = GracefulKiller(client)
    db = client.data
    article_collection = db.articles
    category_counts = db.category_counts
    category_counts.drop()

    while True:
        category_aggregations = article_collection.aggregate([{"$group": {"_id": '$category', "count": {"$sum": 1}}}])
        print("Category counts updated at: %s" % str(datetime.datetime.now()))
        for r in category_aggregations:
            category_counts.update_one({
                'category': r['_id']
            }, {
                '$set': {
                    'count': r['count']
                }
            }, upsert=True)

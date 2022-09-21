# !/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3


class SQLite:
    def __init__(self, path):
        self.db = self._connect(path)

    def _connect(self, path):
        # Create a database connection to the SQLite database
        # Specified by the path
        # :param self.db: Connection object
        # :param path: database file path
        # :return: Connection object or None
        db = None

        try:
            db = sqlite3.connect(path)
        except:
            print("Error! Cannot create the database connection.")

        return db

    def _table(self):
        # Create a table in the SQLite database
        # :param self.db: Connection object
        # :return:
        sql = "CREATE TABLE IF NOT EXISTS connections \
            (ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, \
                password TEXT NOT NULL, cluster TEXT NOT NULL)"

        cursor = self.db.cursor()
        cursor.execute(sql)
        self.db.commit()

    def _select(self):
        # Query all rows in the connections table
        # :param self.db: Connection object
        # :return: list of tuples containing all the rows
        sql = "SELECT * FROM connections"

        cursor = self.db.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()

        for row in rows:
            return [row[1], row[2], row[3]]

    def _insert(self, username, password, cluster):
        # Insert a new row into the connections table
        # :param self.db: Connection object
        # :param username: Database user username
        # :param password: Database user password
        # :param cluster: Database cluster
        # :return:
        cursor = self.db.cursor()
        cursor.execute("""INSERT INTO connections (ID, username, password, cluster) \
                   VALUES(?,?,?,?)""", (1, username, password, cluster))
        self.db.commit()

    def _delete(self):
        # Delete all rows in the connections table
        # :param self.db: Connection object
        # :return:
        sql = "DELETE FROM connections"

        cursor = self.db.cursor()
        cursor.execute(sql)
        self.db.commit()

    def _close(self):
        # Close the connection to the SQLite database
        # :param self.db: Connection object
        # :return:
        self.db.close()

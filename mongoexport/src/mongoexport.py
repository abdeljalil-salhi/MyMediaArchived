# !/usr/bin/env python3
# -*- coding: utf-8 -*-

# Importing system module
from sys import exit
from os import path, mkdir
# Importing required modules
from pymongo import MongoClient
from bson.json_util import dumps
from urllib.parse import quote_plus
from configparser import ConfigParser

from src.art import *
from src.print import *
from src.utilities import *
from src.db.sqlite import SQLite


class MongoExport:
    # Initialize the MongoExport class and call the menu
    def __init__(self):
        self.config = path.join(
            path.dirname(__file__), "../config.ini")
        self.res = None
        self.client = None
        self.choice = None
        self.menu()

    def menu(self):
        try:
            cls()
            banner()
            printf("[01] Set Mongo database URL\n")
            printf("[02] Download database documents as JSON\n\n")
            printf("[99] Exit MongoExport\n\n", BLUE)
            printf("$~> ")
            self.choice = str(input("")).lower()
            if not self.choice == "" and not self.choice == "0":
                if self.choice[0] == "0":
                    self.choice = self.choice[1]
            else:
                self.menu()
            self.action()
        except KeyboardInterrupt:
            self._quit("Exiting...")

    def action(self):
        cls()
        banner()
        if self.choice == "1":
            self.config()
        elif self.choice == "2":
            self.download()
        elif self.choice == "99":
            self._quit("Exiting...")
        else:
            self.menu()
        self.menu()

    def config(self):
        try:
            printf("$MongoDB username\~> ")
            username = str(input("")).lower()
            printf("$MongoDB password\~> ")
            password = str(input("")).lower()
            printf("$MongoDB cluster\~> ")
            cluster = str(input("")).lower()
            printf("$MongoDB database\~> ")
            database = str(input("")).lower()

            with open(self.config, 'w+') as f:
                f.write("[MONGODB]\n")
                f.write(f"USERNAME={username}\n")
                f.write(f"PASSWORD={password}\n")
                f.write(f"CLUSTER={cluster}\n")
                f.write(f"DATABASE={database}\n")
                f.close()

            sep()
            printf("MongoDB URL set successfully!\n", GREEN)
        except:
            sep()
            printf("Something went wrong!\n", RED)
        sep()
        pause()

    def download(self):
        try:
            # Get the MongoDB credentials from the config file
            cparser = ConfigParser()
            cparser.read(self.config)
            USERNAME = quote_plus(cparser["MONGODB"]["USERNAME"])
            PASSWORD = quote_plus(cparser["MONGODB"]["PASSWORD"])
            CLUSTER = cparser["MONGODB"]["CLUSTER"]
            DATABASE = cparser["MONGODB"]["DATABASE"]

            # Preparing the database URL
            uri = f'mongodb+srv://{USERNAME}:{PASSWORD}@{CLUSTER}/'

            # Connecting to the MongoDB database
            self.client = MongoClient(uri)

            # Connecting to the database
            mydatabase = self.client[DATABASE]

            # If the output folder doesn't exist, create it
            if not path.isdir("json"):
                mkdir("json")

            for collection in mydatabase.list_collection_names():
                # Getting the collection
                # from the database
                mycollection = mydatabase[collection]

                # Getting the data from the collection
                # using find() method
                cursor = mycollection.find()

                # Converting cursor to the list
                # of dictionaries
                list_cur = list(cursor)

                # Converting to the JSON
                json_data = dumps(list_cur, indent=2)

                # Printing the data
                with open(f'json/{collection}.json', 'w+') as f:
                    f.write(json_data)
                    f.close()

            # Closing the connection
            self.client.close()

            sep()
            printf("Database downloaded successfully!\n", GREEN)
        except:
            sep()
            printf("Something went wrong!\n", RED)
        sep()
        pause()

    def _quit(self, text="See you soon!"):
        from time import sleep

        cls()
        printf(ascii_art, YELLOW)
        printf(f"\n{text}", RED)
        sleep(1.5)
        cls()
        exit(0)

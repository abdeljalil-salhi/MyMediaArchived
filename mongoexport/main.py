# !/usr/bin/env python3
# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------------
# Author: Abdeljalil Salhi
#                                     ___________                             __
#   _____   ____   ____    ____   ____\_   _____/__  _________   ____________/  |_
#  /     \ /  _ \ /    \  / ___\ /  _ \|    __)_\  \/  /\____ \ /  _ \_  __ \   __\
# |  Y Y  (  <_> )   |  \/ /_/  >  <_> )        \>    < |  |_> >  <_> )  | \/|  |
# |__|_|  /\____/|___|  /\___  / \____/_______  /__/\_ \|   __/ \____/|__|   |__|
#       \/            \//_____/               \/      \/|__|

if __name__ == '__main__':
    from src.utilities import *
    from src.print import *

    cls()
    banner()
    printf("Loading...\n", BLUE)

    from src.mongoexport import MongoExport

    MongoExport()

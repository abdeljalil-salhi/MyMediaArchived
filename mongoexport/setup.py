try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

setup(name='mongoexport',
      version='0.0.1',
      url='',
      py_modules=['mongoexport'],
      scripts=['main.py'],
      platforms='any',
      )
